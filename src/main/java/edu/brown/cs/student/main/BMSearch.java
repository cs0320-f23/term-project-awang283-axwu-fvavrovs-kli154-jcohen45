package edu.brown.cs.student.main;

/**
 * Boyer-Moore algorithm for string-searching, which should take O(m+n) time instead of O(mn) time
 * for brute-force searching
 */
public class BMSearch {
  private char[] needle;
  private char[] haystack;


  public boolean getSearchResult(String needle, String haystack) {
    this.needle = needle.toLowerCase().toCharArray();
    this.haystack = haystack.toLowerCase().toCharArray();
    int index = BMSearch.indexOf(this.haystack, this.needle);
    if (index >= 0) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Returns the index within this string of the first occurrence of the specified substring. If it
   * is not a substring, return -1.
   *
   * @param haystack The string to be scanned
   * @param needle The target string to search
   * @return The start index of the substring
   */
  public static int indexOf(char[] haystack, char[] needle) {
    if (needle.length == 0) {
      return -1;
    }
    int charTable[] = makeCharTable(needle);
    int offsetTable[] = makeOffsetTable(needle);
    for (int i = needle.length - 1, j; i < haystack.length; ) {
      for (j = needle.length - 1; needle[j] == haystack[i]; --i, --j) {
        if (j == 0) {
          return i;
        }
      }
      // i += needle.length - j; // For naive method
      i += Math.max(offsetTable[needle.length - 1 - j], charTable[haystack[i]]);
    }
    return -1;
  }

  /** Makes the jump table based on the mismatched character information. */
  private static int[] makeCharTable(char[] needle) {
    final int ALPHABET_SIZE = Character.MAX_VALUE + 1; // 65536
    int[] table = new int[ALPHABET_SIZE];
    for (int i = 0; i < table.length; ++i) {
      table[i] = needle.length;
    }
    for (int i = 0; i < needle.length; ++i) {
      table[needle[i]] = needle.length - 1 - i;
    }
    return table;
  }

  /** Makes the jump table based on the scan offset which mismatch occurs. (bad-character rule). */
  private static int[] makeOffsetTable(char[] needle) {
    int[] table = new int[needle.length];
    int lastPrefixPosition = needle.length;
    for (int i = needle.length; i > 0; --i) {
      if (isPrefix(needle, i)) {
        lastPrefixPosition = i;
      }
      table[needle.length - i] = lastPrefixPosition - i + needle.length;
    }
    for (int i = 0; i < needle.length - 1; ++i) {
      int slen = suffixLength(needle, i);
      table[slen] = needle.length - 1 - i + slen;
    }
    return table;
  }

  /** Is needle[p:end] a prefix of needle? */
  private static boolean isPrefix(char[] needle, int p) {
    for (int i = p, j = 0; i < needle.length; ++i, ++j) {
      if (needle[i] != needle[j]) {
        return false;
      }
    }
    return true;
  }

  /** Returns the maximum length of the substring ends at p and is a suffix. (good-suffix rule) */
  private static int suffixLength(char[] needle, int p) {
    int len = 0;
    for (int i = p, j = needle.length - 1; i >= 0 && needle[i] == needle[j]; --i, --j) {
      len += 1;
    }
    return len;
  }
}
