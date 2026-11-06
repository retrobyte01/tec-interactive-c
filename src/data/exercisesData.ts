export interface CodingExercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
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
  {
    id: 'ex-01',
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
    hints: [
      'Never initialize your factorial multiplier with 0 or the result will always be 0.'
    ]
  },
  {
    id: 'ex-04',
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
    id: 'ex-05',
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
    hints: [
      'Remember string arrays terminate at the null character \\0.'
    ]
  }
];
