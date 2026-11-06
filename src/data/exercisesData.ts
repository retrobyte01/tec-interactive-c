export interface CodingExercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  chapterNumber: number;
  description: string;
  instructions: string[];
  starterCode: string;
  expectedOutput: string;
  solutionCode: string;
  defaultStdin?: string;
  testCases: {
    input?: string;
    expectedOutput: string;
    description: string;
  }[];
  hints: string[];
}

export const CODING_EXERCISES: CodingExercise[] = [
  // CHAPTER 01
  {
    id: 'ex-01',
    chapterNumber: 1,
    title: 'Hello World & First Printf',
    difficulty: 'Beginner',
    category: 'Variables & Basics',
    description: 'Welcome to C programming! Write a simple program to print "Hello, World!" to standard output.',
    instructions: [
      'Include the standard I/O library <stdio.h>',
      'Create the int main() function entry point',
      'Use printf to output "Hello, World!\\n"',
      'Return 0 to indicate successful program termination'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    \n    return 0;\n}`,
    expectedOutput: 'Hello, World!',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`,
    testCases: [
      {
        description: 'Standard execution check',
        expectedOutput: 'Hello, World!'
      }
    ],
    hints: [
      'Remember that in C strings must be enclosed in double quotes.',
      'Every statement must terminate with a semicolon (;).'
    ]
  },
  {
    id: 'ex-02',
    chapterNumber: 1,
    title: 'User Input & Rectangle Area (scanf)',
    difficulty: 'Beginner',
    category: 'Variables & User Input',
    description: 'Take length and breadth as input from the user using scanf(), then compute and display the area of the rectangle.',
    instructions: [
      'Declare integer variables length and breadth',
      'Prompt user and read length with scanf("%d", &length)',
      'Prompt user and read breadth with scanf("%d", &breadth)',
      'Compute area = length * breadth',
      'Display: "Calculated Area = %d sq units\\n"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int length, breadth;\n    printf("Enter rectangle length: ");\n    scanf("%d", &length);\n\n    printf("Enter rectangle breadth: ");\n    scanf("%d", &breadth);\n\n    int area = length * breadth;\n    printf("Calculated Area = %d sq units\\n", area);\n    return 0;\n}`,
    defaultStdin: '12\n8',
    expectedOutput: 'Calculated Area = 96 sq units',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int length, breadth;\n    printf("Enter rectangle length: ");\n    scanf("%d", &length);\n\n    printf("Enter rectangle breadth: ");\n    scanf("%d", &breadth);\n\n    int area = length * breadth;\n    printf("Calculated Area = %d sq units\\n", area);\n    return 0;\n}`,
    testCases: [
      {
        input: '12 8',
        description: 'Input length=12, breadth=8',
        expectedOutput: 'Calculated Area = 96 sq units'
      },
      {
        input: '10 5',
        description: 'Input length=10, breadth=5',
        expectedOutput: 'Calculated Area = 50 sq units'
      }
    ],
    hints: [
      'Always remember the & (address-of) operator when reading integers with scanf("%d", &variable).',
      'You can enter inputs live in the terminal prompt or type them in the Standard Input (stdin) box.'
    ]
  },
  {
    id: 'ex-03',
    chapterNumber: 1,
    title: 'Circle Area & Cylinder Volume',
    difficulty: 'Beginner',
    category: 'Variables & Constants',
    description: 'Calculate the area of a circle with radius 4 and the volume of a cylinder with radius 4 and height 7 using float arithmetic.',
    instructions: [
      'Declare float radius = 4.0, height = 7.0, and pi = 3.14159',
      'Compute circle area = pi * radius * radius',
      'Compute cylinder volume = area * height',
      'Print formatted results: "Area: %.2f, Volume: %.2f\\n"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    float radius = 4.0;\n    float height = 7.0;\n    float pi = 3.14159;\n    \n    // Calculate and print\n    \n    return 0;\n}`,
    expectedOutput: 'Area: 50.27, Volume: 351.86',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    float radius = 4.0;\n    float height = 7.0;\n    float pi = 3.14159;\n    float area = pi * radius * radius;\n    float volume = area * height;\n    printf("Area: %.2f, Volume: %.2f\\n", area, volume);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Geometric volume precision check',
        expectedOutput: 'Area: 50.27, Volume: 351.86'
      }
    ],
    hints: ['Use %.2f format specifier to round floats to 2 decimal places.']
  },
  {
    id: 'ex-04',
    chapterNumber: 1,
    title: 'Celsius to Fahrenheit Converter',
    difficulty: 'Beginner',
    category: 'Variables & Arithmetic',
    description: 'Convert a given temperature from Celsius (37°C - human body temperature) into Fahrenheit using the formula (C * 9/5) + 32.',
    instructions: [
      'Declare float celsius = 37.0',
      'Calculate fahrenheit = (celsius * 9.0 / 5.0) + 32.0',
      'Print: "37.00 C = 98.60 F\\n"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    float celsius = 37.0;\n    \n    // Formula: (celsius * 9 / 5) + 32\n    \n    return 0;\n}`,
    expectedOutput: '37.00 C = 98.60 F',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    float celsius = 37.0;\n    float fahrenheit = (celsius * 9.0 / 5.0) + 32.0;\n    printf("%.2f C = %.2f F\\n", celsius, fahrenheit);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Standard boiling and normal body temp check',
        expectedOutput: '37.00 C = 98.60 F'
      }
    ],
    hints: ['Write 9.0 / 5.0 instead of 9 / 5 to avoid integer division truncation!']
  },

  // CHAPTER 02
  {
    id: 'ex-05',
    chapterNumber: 2,
    title: 'Divisibility by 97 Test',
    difficulty: 'Beginner',
    category: 'Instructions & Operators',
    description: 'Check whether a number is divisible by 97 using the modulus operator (%). Numbers divisible by 97 leave remainder 0.',
    instructions: [
      'Take input integer num',
      'Check if num % 97 == 0',
      'Print: "Divisible by 97: YES" or "Divisible by 97: NO"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int num;\n    scanf("%d", &num);\n    \n    // Test divisibility with %\n    \n    return 0;\n}`,
    defaultStdin: '194',
    expectedOutput: 'Divisible by 97: YES',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int num;\n    scanf("%d", &num);\n    if (num % 97 == 0) {\n        printf("Divisible by 97: YES\\n");\n    } else {\n        printf("Divisible by 97: NO\\n");\n    }\n    return 0;\n}`,
    testCases: [
      {
        input: '194',
        description: '194 is 97 * 2',
        expectedOutput: 'Divisible by 97: YES'
      },
      {
        input: '100',
        description: '100 % 97 is 3',
        expectedOutput: 'Divisible by 97: NO'
      }
    ],
    hints: ['The modulus operator % returns the remainder after integer division.']
  },

  // CHAPTER 03
  {
    id: 'ex-06',
    chapterNumber: 3,
    title: 'Student Pass or Fail System',
    difficulty: 'Beginner',
    category: 'Conditional Instructions',
    description: 'Determine if a student passed. Passing requires at least 40% total marks AND at least 33% in each of 3 subjects.',
    instructions: [
      'Given marks m1 = 45, m2 = 38, m3 = 55 (each out of 100)',
      'Calculate total percentage = (m1 + m2 + m3) / 3.0',
      'If total >= 40 AND m1 >= 33 AND m2 >= 33 AND m3 >= 33: "Status: PASSED (46.00%)"',
      'Otherwise print "Status: FAILED"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int m1 = 45, m2 = 38, m3 = 55;\n    \n    // Evaluate pass or fail with && operator\n    \n    return 0;\n}`,
    expectedOutput: 'Status: PASSED (46.00%)',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int m1 = 45, m2 = 38, m3 = 55;\n    float total = (m1 + m2 + m3) / 3.0;\n    if (total >= 40 && m1 >= 33 && m2 >= 33 && m3 >= 33) {\n        printf("Status: PASSED (%.2f%%)\\n", total);\n    } else {\n        printf("Status: FAILED\\n");\n    }\n    return 0;\n}`,
    testCases: [
      {
        description: 'Pass condition validation',
        expectedOutput: 'Status: PASSED (46.00%)'
      }
    ],
    hints: ['Use the logical AND operator && to chain multiple condition requirements.']
  },
  {
    id: 'ex-07',
    chapterNumber: 3,
    title: 'Leap Year Validator',
    difficulty: 'Beginner',
    category: 'Conditional Instructions',
    description: 'A year is a leap year if it is divisible by 400, OR divisible by 4 but NOT divisible by 100. Write a program to test year 2024.',
    instructions: [
      'Initialize int year = 2024',
      'Check: (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)',
      'Print: "2024 is a Leap Year"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int year = 2024;\n    \n    // Leap year logic\n    \n    return 0;\n}`,
    expectedOutput: '2024 is a Leap Year',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int year = 2024;\n    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {\n        printf("%d is a Leap Year\\n", year);\n    } else {\n        printf("%d is not a Leap Year\\n", year);\n    }\n    return 0;\n}`,
    testCases: [
      {
        description: 'Checks leap year rules correctly',
        expectedOutput: '2024 is a Leap Year'
      }
    ],
    hints: ['Combine || (OR) and && (AND) with parentheses.']
  },

  // CHAPTER 04
  {
    id: 'ex-08',
    chapterNumber: 4,
    title: 'Multiplication Table with Loops',
    difficulty: 'Beginner',
    category: 'Loops & Iteration',
    description: 'Print the complete multiplication table of 7 from 1 to 10 in the format "7 x 1 = 7" using a for loop.',
    instructions: [
      'Initialize int n = 7',
      'Loop for i from 1 to 10',
      'Print: "%d x %d = %d\\n"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int n = 7;\n    \n    // Multiplication table loop\n    \n    return 0;\n}`,
    expectedOutput: '7 x 10 = 70',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int n = 7;\n    for (int i = 1; i <= 10; i++) {\n        printf("%d x %d = %d\\n", n, i, n * i);\n    }\n    return 0;\n}`,
    testCases: [
      {
        description: 'Multiplication table ends with 7 x 10 = 70',
        expectedOutput: '7 x 10 = 70'
      }
    ],
    hints: ['for (int i = 1; i <= 10; i++) generates values 1 through 10.']
  },
  {
    id: 'ex-09',
    chapterNumber: 4,
    title: 'Factorial Calculator with Loop',
    difficulty: 'Intermediate',
    category: 'Loops & Iteration',
    description: 'Calculate the factorial of n = 6 using a for loop. (6! = 6 * 5 * 4 * 3 * 2 * 1 = 720).',
    instructions: [
      'Initialize an integer n = 6',
      'Initialize product accumulator result = 1',
      'Use a for loop running from 1 through n',
      'Print: "Factorial of 6 is 720"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int n = 6;\n    int fact = 1;\n    \n    // Implement factorial loop here\n    \n    return 0;\n}`,
    expectedOutput: 'Factorial of 6 is 720',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int n = 6;\n    int fact = 1;\n    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    printf("Factorial of %d is %d\\n", n, fact);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Computes 6! accurately',
        expectedOutput: 'Factorial of 6 is 720'
      }
    ],
    hints: ['Never initialize your factorial multiplier with 0 or the result will always be 0.']
  },
  {
    id: 'ex-10',
    chapterNumber: 4,
    title: 'Prime Number Tester',
    difficulty: 'Intermediate',
    category: 'Loops & Iteration',
    description: 'Determine whether n = 29 is a prime number (divisible only by 1 and itself) using a loop.',
    instructions: [
      'Initialize int n = 29, isPrime = 1',
      'Loop from 2 to n - 1; if n % i == 0, set isPrime = 0 and break',
      'Print: "29 is a Prime Number"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int n = 29;\n    int isPrime = 1;\n    \n    // Prime check loop\n    \n    return 0;\n}`,
    expectedOutput: '29 is a Prime Number',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int n = 29;\n    int isPrime = 1;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            isPrime = 0;\n            break;\n        }\n    }\n    if (isPrime) {\n        printf("%d is a Prime Number\\n", n);\n    } else {\n        printf("%d is not a Prime Number\\n", n);\n    }\n    return 0;\n}`,
    testCases: [
      {
        description: 'Checks primality of 29',
        expectedOutput: '29 is a Prime Number'
      }
    ],
    hints: ['You can stop checking at i * i <= n for optimum performance.']
  },

  // CHAPTER 05
  {
    id: 'ex-11',
    chapterNumber: 5,
    title: 'Average of Three Numbers (Functions)',
    difficulty: 'Beginner',
    category: 'Functions & Recursion',
    description: 'Define a function float average(int a, int b, int c) that returns the arithmetic average of three integers.',
    instructions: [
      'Write float average(int a, int b, int c)',
      'Call average(10, 20, 35) in main',
      'Print: "Average = 21.67"'
    ],
    starterCode: `#include <stdio.h>\n\nfloat average(int a, int b, int c) {\n    // Return average\n}\n\nint main() {\n    float avg = average(10, 20, 35);\n    printf("Average = %.2f\\n", avg);\n    return 0;\n}`,
    expectedOutput: 'Average = 21.67',
    solutionCode: `#include <stdio.h>\n\nfloat average(int a, int b, int c) {\n    return (a + b + c) / 3.0;\n}\n\nint main() {\n    float avg = average(10, 20, 35);\n    printf("Average = %.2f\\n", avg);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Computes float average',
        expectedOutput: 'Average = 21.67'
      }
    ],
    hints: ['Divide by 3.0 rather than 3 to retain decimal precision.']
  },
  {
    id: 'ex-12',
    chapterNumber: 5,
    title: 'Recursive Fibonacci Sequence',
    difficulty: 'Intermediate',
    category: 'Functions & Recursion',
    description: 'Compute the nth Fibonacci number using recursion where fib(1)=0, fib(2)=1, fib(n) = fib(n-1) + fib(n-2).',
    instructions: [
      'Write int fib(int n) with base cases n==1 -> 0, n==2 -> 1',
      'Calculate the 7th Fibonacci number',
      'Print: "7th Fibonacci element = 8"'
    ],
    starterCode: `#include <stdio.h>\n\nint fib(int n) {\n    // Base cases & recursive call\n}\n\nint main() {\n    int result = fib(7);\n    printf("7th Fibonacci element = %d\\n", result);\n    return 0;\n}`,
    expectedOutput: '7th Fibonacci element = 8',
    solutionCode: `#include <stdio.h>\n\nint fib(int n) {\n    if (n <= 1) return 0;\n    if (n == 2) return 1;\n    return fib(n - 1) + fib(n - 2);\n}\n\nint main() {\n    int result = fib(7);\n    printf("7th Fibonacci element = %d\\n", result);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Calculates 7th Fibonacci term',
        expectedOutput: '7th Fibonacci element = 8'
      }
    ],
    hints: ['A recursive function must always have a terminating base case.']
  },

  // CHAPTER 06
  {
    id: 'ex-13',
    chapterNumber: 6,
    title: 'Swap Two Numbers with Pointers',
    difficulty: 'Intermediate',
    category: 'Pointers & Memory',
    description: 'Implement a void swap(int *a, int *b) function using Call by Reference to swap two integer values in place.',
    instructions: [
      'Define void swap(int *x, int *y)',
      'Use a temporary variable to hold *x, assign *y to *x, and temp to *y',
      'Pass addresses of a and b using the & operator from main',
      'Print the swapped values: "Swapped: a=50, b=20"'
    ],
    starterCode: `#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    // Implement in-place swap using dereference *\n}\n\nint main() {\n    int a = 20, b = 50;\n    // Call swap with &a and &b\n    \n    return 0;\n}`,
    expectedOutput: 'Swapped: a=50, b=20',
    solutionCode: `#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 20, b = 50;\n    swap(&a, &b);\n    printf("Swapped: a=%d, b=%d\\n", a, b);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Swaps values via address dereferencing',
        expectedOutput: 'Swapped: a=50, b=20'
      }
    ],
    hints: [
      'int temp = *x stores the value at pointer x into temp.',
      'Pass &a and &b to the swap function.'
    ]
  },
  {
    id: 'ex-14',
    chapterNumber: 6,
    title: 'Multiply Variable by 10 using Pointer',
    difficulty: 'Intermediate',
    category: 'Pointers & Memory',
    description: 'Write a void timesTen(int *ptr) function that alters the variable passed to it by multiplying its stored value by 10.',
    instructions: [
      'Write void timesTen(int *ptr)',
      'Inside the function: *ptr = *ptr * 10',
      'In main: int val = 7; timesTen(&val);',
      'Print: "New Value = 70"'
    ],
    starterCode: `#include <stdio.h>\n\nvoid timesTen(int *ptr) {\n    // Modify value at pointer\n}\n\nint main() {\n    int val = 7;\n    timesTen(&val);\n    printf("New Value = %d\\n", val);\n    return 0;\n}`,
    expectedOutput: 'New Value = 70',
    solutionCode: `#include <stdio.h>\n\nvoid timesTen(int *ptr) {\n    *ptr = *ptr * 10;\n}\n\nint main() {\n    int val = 7;\n    timesTen(&val);\n    printf("New Value = %d\\n", val);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Multiplies target memory by 10',
        expectedOutput: 'New Value = 70'
      }
    ],
    hints: ['Dereferencing *ptr allows modifying the caller variable directly.']
  },

  // CHAPTER 07
  {
    id: 'ex-15',
    chapterNumber: 7,
    title: 'Array Reversal in Contiguous Memory',
    difficulty: 'Intermediate',
    category: 'Arrays & Memory',
    description: 'Write a program to reverse an array of 5 integers {10, 20, 30, 40, 50} in place by swapping elements from both ends.',
    instructions: [
      'Initialize int arr[] = {10, 20, 30, 40, 50}; int n = 5;',
      'Loop for i from 0 to n/2: swap arr[i] with arr[n - 1 - i]',
      'Print the reversed array: "Reversed Array: 50 40 30 20 10"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int n = 5;\n    \n    // In-place reverse\n    \n    return 0;\n}`,
    expectedOutput: 'Reversed Array: 50 40 30 20 10',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int n = 5;\n    for (int i = 0; i < n / 2; i++) {\n        int temp = arr[i];\n        arr[i] = arr[n - 1 - i];\n        arr[n - 1 - i] = temp;\n    }\n    printf("Reversed Array: %d %d %d %d %d\\n", arr[0], arr[1], arr[2], arr[3], arr[4]);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Reverses integer array',
        expectedOutput: 'Reversed Array: 50 40 30 20 10'
      }
    ],
    hints: ['Only iterate up to n / 2, otherwise you will swap elements back twice!']
  },

  // CHAPTER 08
  {
    id: 'ex-16',
    chapterNumber: 8,
    title: 'Custom String Length (strlen Clone)',
    difficulty: 'Intermediate',
    category: 'Strings & Pointers',
    description: 'Write a function int myStrlen(char *str) that calculates the number of characters in a string by detecting the null terminator (\\0).',
    instructions: [
      'Write int myStrlen(char *str)',
      'Count characters until str[count] == \'\\0\'',
      'Test with char s[] = "DennisRitchie";',
      'Print: "Length of DennisRitchie is 13"'
    ],
    starterCode: `#include <stdio.h>\n\nint myStrlen(char *str) {\n    // Count until '\\0'\n}\n\nint main() {\n    char s[] = "DennisRitchie";\n    int len = myStrlen(s);\n    printf("Length of %s is %d\\n", s, len);\n    return 0;\n}`,
    expectedOutput: 'Length of DennisRitchie is 13',
    solutionCode: `#include <stdio.h>\n\nint myStrlen(char *str) {\n    int count = 0;\n    while (str[count] != '\\0') {\n        count++;\n    }\n    return count;\n}\n\nint main() {\n    char s[] = "DennisRitchie";\n    int len = myStrlen(s);\n    printf("Length of %s is %d\\n", s, len);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Accurately computes string length',
        expectedOutput: 'Length of DennisRitchie is 13'
      }
    ],
    hints: ['All standard C strings terminate with the null character \'\\0\'.']
  },
  {
    id: 'ex-17',
    chapterNumber: 8,
    title: 'Custom String Reversal',
    difficulty: 'Advanced',
    category: 'Strings & Pointers',
    description: 'Write a program to reverse a string in-place without using external libraries and print its reversed content.',
    instructions: [
      'Given char str[] = "ANTIGRAVITY";',
      'Calculate the length of the string by detecting \\0',
      'Swap characters from both ends towards the middle',
      'Print: "Reversed: YTIVARGINTA"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    char str[] = "ANTIGRAVITY";\n    \n    // Reverse string in-place\n    \n    return 0;\n}`,
    expectedOutput: 'Reversed: YTIVARGINTA',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    char str[] = "ANTIGRAVITY";\n    int len = 0;\n    while (str[len] != '\\0') len++;\n    \n    for (int i = 0; i < len / 2; i++) {\n        char temp = str[i];\n        str[i] = str[len - 1 - i];\n        str[len - 1 - i] = temp;\n    }\n    printf("Reversed: %s\\n", str);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Inverts string characters accurately',
        expectedOutput: 'Reversed: YTIVARGINTA'
      }
    ],
    hints: ['Remember string arrays terminate at the null character \\0.']
  },

  // CHAPTER 09
  {
    id: 'ex-18',
    chapterNumber: 9,
    title: '2D Vector Sum using Structures',
    difficulty: 'Intermediate',
    category: 'Structures',
    description: 'Create a struct vector with fields int x and int y. Write a function struct vector sumVector(struct vector v1, struct vector v2) to add two vectors.',
    instructions: [
      'Define struct vector { int x; int y; };',
      'Write sumVector to add corresponding x and y coordinates',
      'Given v1 = (4, 7) and v2 = (9, 2)',
      'Print: "Vector Sum = (13, 9)"'
    ],
    starterCode: `#include <stdio.h>\n\nstruct vector {\n    int x;\n    int y;\n};\n\nstruct vector sumVector(struct vector v1, struct vector v2) {\n    // Return sum vector\n}\n\nint main() {\n    struct vector v1 = {4, 7};\n    struct vector v2 = {9, 2};\n    struct vector v3 = sumVector(v1, v2);\n    printf("Vector Sum = (%d, %d)\\n", v3.x, v3.y);\n    return 0;\n}`,
    expectedOutput: 'Vector Sum = (13, 9)',
    solutionCode: `#include <stdio.h>\n\nstruct vector {\n    int x;\n    int y;\n};\n\nstruct vector sumVector(struct vector v1, struct vector v2) {\n    struct vector result;\n    result.x = v1.x + v2.x;\n    result.y = v1.y + v2.y;\n    return result;\n}\n\nint main() {\n    struct vector v1 = {4, 7};\n    struct vector v2 = {9, 2};\n    struct vector v3 = sumVector(v1, v2);\n    printf("Vector Sum = (%d, %d)\\n", v3.x, v3.y);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Structure coordinate summation',
        expectedOutput: 'Vector Sum = (13, 9)'
      }
    ],
    hints: ['Structures can be passed to and returned from functions like primitives.']
  },

  // CHAPTER 11
  {
    id: 'ex-19',
    chapterNumber: 11,
    title: 'Dynamic Memory Array with malloc & free',
    difficulty: 'Advanced',
    category: 'Dynamic Memory Allocation',
    description: 'Demonstrate dynamic memory allocation by allocating space for 5 integers using malloc(), assigning values 10, 20, 30, 40, 50, displaying them, and freeing the memory.',
    instructions: [
      'Include <stdlib.h>',
      'int *ptr = (int*)malloc(5 * sizeof(int));',
      'Fill values and compute sum',
      'free(ptr);',
      'Print: "DMA Array Sum = 150"'
    ],
    starterCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Allocate 5 integers with malloc\n    \n    return 0;\n}`,
    expectedOutput: 'DMA Array Sum = 150',
    solutionCode: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *ptr = (int*)malloc(5 * sizeof(int));\n    if (ptr == NULL) return 1;\n    int sum = 0;\n    for (int i = 0; i < 5; i++) {\n        ptr[i] = (i + 1) * 10;\n        sum += ptr[i];\n    }\n    printf("DMA Array Sum = %d\\n", sum);\n    free(ptr);\n    return 0;\n}`,
    testCases: [
      {
        description: 'Allocates, sums, and frees heap memory',
        expectedOutput: 'DMA Array Sum = 150'
      }
    ],
    hints: ['Always remember to call free(ptr) to release heap memory.']
  },

  // MAJOR HANDBOOK PROJECTS
  {
    id: 'ex-20',
    chapterNumber: 4,
    title: 'Project 1: Number Guessing Game',
    difficulty: 'Intermediate',
    category: 'Capstone Projects',
    description: 'Implement the iconic Number Guessing Game from the Handbook. The computer picks a secret number, and counts attempts until the user finds it.',
    instructions: [
      'Secret number is 42',
      'Read user guess using scanf("%d", &guess)',
      'If guess < 42: "Higher number please!"',
      'If guess > 42: "Lower number please!"',
      'When matched: "You guessed it in %d attempts!\\n"'
    ],
    starterCode: `#include <stdio.h>\n\nint main() {\n    int secret = 42;\n    int guess;\n    int attempts = 0;\n    \n    // Implement guessing loop\n    \n    return 0;\n}`,
    defaultStdin: '25\n50\n42',
    expectedOutput: 'You guessed it in 3 attempts!',
    solutionCode: `#include <stdio.h>\n\nint main() {\n    int secret = 42;\n    int guess;\n    int attempts = 0;\n    do {\n        scanf("%d", &guess);\n        attempts++;\n        if (guess > secret) {\n            printf("Lower number please!\\n");\n        } else if (guess < secret) {\n            printf("Higher number please!\\n");\n        } else {\n            printf("You guessed it in %d attempts!\\n", attempts);\n        }\n    } while (guess != secret);\n    return 0;\n}`,
    testCases: [
      {
        input: '25 50 42',
        description: 'Simulates 3 guess attempts to match 42',
        expectedOutput: 'You guessed it in 3 attempts!'
      }
    ],
    hints: ['Use a do-while loop so the user is prompted at least once.']
  },
  {
    id: 'ex-21',
    chapterNumber: 5,
    title: 'Project 2: Snake, Water, Gun Game',
    difficulty: 'Advanced',
    category: 'Capstone Projects',
    description: 'The Dennis Ritchie classic: Snake drinks Water (S wins), Water douses Gun (W wins), Gun shoots Snake (G wins). Determine the winner against computer choice.',
    instructions: [
      'Player picks \'s\', computer picks \'w\'',
      'Snake drinks Water -> Player Wins',
      'Print: "Player chose: s, Computer chose: w -> You Win!"'
    ],
    starterCode: `#include <stdio.h>\n\nint snakeWaterGun(char you, char comp) {\n    // Return 1 for win, -1 for lose, 0 for draw\n}\n\nint main() {\n    char you = 's', comp = 'w';\n    int result = snakeWaterGun(you, comp);\n    if (result == 1) printf("Player chose: %c, Computer chose: %c -> You Win!\\n", you, comp);\n    return 0;\n}`,
    expectedOutput: 'Player chose: s, Computer chose: w -> You Win!',
    solutionCode: `#include <stdio.h>\n\nint snakeWaterGun(char you, char comp) {\n    if (you == comp) return 0;\n    if (you == 's' && comp == 'w') return 1;\n    if (you == 'w' && comp == 'g') return 1;\n    if (you == 'g' && comp == 's') return 1;\n    return -1;\n}\n\nint main() {\n    char you = 's', comp = 'w';\n    int result = snakeWaterGun(you, comp);\n    if (result == 1) {\n        printf("Player chose: %c, Computer chose: %c -> You Win!\\n", you, comp);\n    } else if (result == -1) {\n        printf("You Lose!\\n");\n    } else {\n        printf("Game Draw!\\n");\n    }\n    return 0;\n}`,
    testCases: [
      {
        description: 'Validates game logic for Snake beating Water',
        expectedOutput: 'Player chose: s, Computer chose: w -> You Win!'
      }
    ],
    hints: ['Draw condition happens when you == comp.']
  }
];
