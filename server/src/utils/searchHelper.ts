/**
 * Prepare search query for PostgreSQL full-text search
 * Handles short words (1-3 letters) and creates proper tsquery
 */
export function prepareSearchQuery(searchTerm: string): string {
  if (!searchTerm || searchTerm.trim() === '') {
    return '';
  }

  // Split search term into words
  const words = searchTerm
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (words.length === 0) {
    return '';
  }

  // Process each word
  const processedWords = words.map((word) => {
    // Remove special characters but keep letters and numbers
    const cleanWord = word.replace(/[^\w]/g, '');

    if (cleanWord.length === 0) {
      return null;
    }

    // For short words (1-3 letters), use exact match
    // For longer words, use prefix matching
    if (cleanWord.length <= 3) {
      return cleanWord;
    } else {
      return `${cleanWord}:*`;
    }
  });

  // Filter out null values and join with OR operator
  const validWords = processedWords.filter((word) => word !== null);

  if (validWords.length === 0) {
    return '';
  }

  // Join words with & (AND) for better relevance
  return validWords.join(' & ');
}

/**
 * Build WHERE clause for full-text search
 */
export function buildSearchCondition(searchQuery: string) {
  if (!searchQuery) {
    return {};
  }

  return {
    OR: [
      // Full-text search using tsvector
      {
        searchVector: {
          search: searchQuery,
        },
      },
      // Fallback: ILIKE search for very short terms
      {
        title: {
          contains: searchQuery.replace(/[&|:*]/g, ''),
          mode: 'insensitive' as const,
        },
      },
      {
        company: {
          contains: searchQuery.replace(/[&|:*]/g, ''),
          mode: 'insensitive' as const,
        },
      },
    ],
  };
}
