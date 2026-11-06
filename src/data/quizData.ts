export type QuizQuestionType = 
  | 'multiple-choice'
  | 'true-false'
  | 'predict-output'
  | 'find-error'
  | 'fill-missing'
  | 'conceptual';

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  conceptNote: string;
}

export interface ModuleQuiz {
  moduleId: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
}

export const MODULE_QUIZZES: Record<string, ModuleQuiz> = {
  ch01: {
    moduleId: 'ch01',
    title: 'Chapter 01: Variables, Constants & Keywords Quiz',
    description: 'Test your understanding of Dennis Ritchie’s C, variable naming rules, 32 keywords, and basic printf/scanf.',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        question: 'Which of the following is a valid variable name in C?',
        options: ['1student_age', '$score', 'total_count', 'default'],
        correctOptionIndex: 2,
        explanation: 'Variables cannot start with numbers, cannot contain special characters like $, and cannot be reserved keywords (like default). "total_count" is completely valid.',
        conceptNote: 'Variable naming rules: letters, digits, underscores only; must start with a letter or underscore.'
      },
      {
        id: 'q1-2',
        type: 'predict-output',
        question: 'What is the output of the following code snippet?',
        codeSnippet: `#include <stdio.h>\nint main() {\n    int a = 10;\n    printf("%d", a);\n    return 0;\n}`,
        options: ['%d', '10', 'a', 'Error'],
        correctOptionIndex: 1,
        explanation: '%d is the format specifier for integers. It inserts the decimal integer representation of variable a, printing 10.',
        conceptNote: 'printf replaces %d with the value of the integer variable passed in the argument list.'
      },
      {
        id: 'q1-3',
        type: 'conceptual',
        question: 'Why is the & (ampersand) operator necessary when passing an int variable to scanf()?',
        options: [
          'It instructs the compiler to format the output',
          'It provides the memory address of the variable so scanf can write user input into RAM',
          'It is only used for decorative syntax in C',
          'It clears the console buffer before reading'
        ],
        correctOptionIndex: 1,
        explanation: 'The & operator is the address-of operator. scanf requires the memory address where it should store the user input.',
        conceptNote: 'scanf("&variable") needs an address pointer to modify the variable in memory.'
      },
      {
        id: 'q1-4',
        type: 'true-false',
        question: 'Variable names in the C language are case-sensitive.',
        options: ['True', 'False'],
        correctOptionIndex: 0,
        explanation: 'In C, variable names are case-sensitive. Variable "Count" and variable "count" refer to two distinct memory locations.',
        conceptNote: 'C is strictly case-sensitive across keywords, identifiers, and function names.'
      }
    ]
  },
  ch02: {
    moduleId: 'ch02',
    title: 'Chapter 02: Instructions and Operators Quiz',
    description: 'Assess arithmetic rules, integer division truncation, and operator precedence and associativity.',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'q2-1',
        type: 'predict-output',
        question: 'What is the exact result of the integer division expression: 5 / 2 in C?',
        options: ['2.5', '2', '3', '0'],
        correctOptionIndex: 1,
        explanation: 'Because both operands are integers, integer division truncates the fractional part, resulting in 2 rather than 2.5.',
        conceptNote: 'int / int produces an int. To obtain 2.5, at least one operand must be a float (e.g., 5.0 / 2).'
      },
      {
        id: 'q2-2',
        type: 'predict-output',
        question: 'What is the value of: -5 % 2?',
        options: ['-1', '1', '-2.5', 'Undefined'],
        correctOptionIndex: 0,
        explanation: 'In C, the sign of the result of the modulus operator (%) strictly follows the sign of the numerator (-5). Hence -5 % 2 = -1.',
        conceptNote: 'Modulus sign rule: sign always mirrors the first operand (numerator).'
      },
      {
        id: 'q2-3',
        type: 'predict-output',
        question: 'What does the expression evaluate to: 3 * 2 / 3 - 3 + 1?',
        options: ['0', '1', '2', '3'],
        correctOptionIndex: 0,
        explanation: 'Due to left-to-right associativity: (3 * 2) = 6 -> (6 / 3) = 2 -> (2 - 3) = -1 -> (-1 + 1) = 0.',
        conceptNote: '* and / have equal precedence and evaluate from left to right.'
      },
      {
        id: 'q2-4',
        type: 'multiple-choice',
        question: 'Which arithmetic operator is INVALID when applied to floating-point numbers in C?',
        options: ['/', '*', '%', '+'],
        correctOptionIndex: 2,
        explanation: 'The modulus operator (%) cannot be applied to float or double operands in C; it is strictly defined for integer types.',
        conceptNote: 'Use fmod() from <math.h> if remainder of floats is needed.'
      }
    ]
  },
  ch03: {
    moduleId: 'ch03',
    title: 'Chapter 03: Conditional Instructions Quiz',
    description: 'Test your understanding of if-else, relational/logical operators, truthiness, and switch statements.',
    difficulty: 'Beginner',
    questions: [
      {
        id: 'q3-1',
        type: 'predict-output',
        question: 'What will be printed by the following code snippet?',
        codeSnippet: `int a = 10;\nif (a = 11)\n    printf("I am 11");\nelse\n    printf("I am not 11");`,
        options: ['I am not 11', 'I am 11', 'Compilation Error', 'Nothing is printed'],
        correctOptionIndex: 1,
        explanation: 'Notice `a = 11` is an assignment, not a comparison `==`. The expression assigns 11 to `a` and evaluates to 11. Since 11 is non-zero, it is treated as TRUE.',
        conceptNote: 'In C, non-zero is TRUE, zero is FALSE. Assignment inside an if expression returns the assigned value.'
      },
      {
        id: 'q3-2',
        type: 'multiple-choice',
        question: 'What happens if you omit the "break;" statement inside a switch case block?',
        options: [
          'The program throws a compile error',
          'Execution falls through into the subsequent case statements',
          'The computer reboots',
          'The switch statement restarts from the first case'
        ],
        correctOptionIndex: 1,
        explanation: 'Without a break statement, control flows directly into the following case statements regardless of whether their condition matches.',
        conceptNote: 'This behavior is known as switch fall-through.'
      },
      {
        id: 'q3-3',
        type: 'predict-output',
        question: 'What is the boolean evaluation of the expression: !(3 > 30)?',
        options: ['0 (False)', '1 (True)', '30', 'Error'],
        correctOptionIndex: 1,
        explanation: '3 > 30 is false (0). The logical NOT operator (!) inverts false to true (1).',
        conceptNote: 'Logical NOT ! turns non-zero to 0 and 0 to 1.'
      }
    ]
  },
  ch04: {
    moduleId: 'ch04',
    title: 'Chapter 04: Loop Control Instructions Quiz',
    description: 'Assess while, do-while, for loops, increment nuances, and break/continue control statements.',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q4-1',
        type: 'multiple-choice',
        question: 'Which loop is guaranteed to execute its code block at least once, even if the condition is false?',
        options: ['for loop', 'while loop', 'do-while loop', 'nested loop'],
        correctOptionIndex: 2,
        explanation: 'A do-while loop evaluates its condition at the end of the loop body (exit-controlled), guaranteeing at least one execution.',
        conceptNote: 'do-while is an exit-controlled loop.'
      },
      {
        id: 'q4-2',
        type: 'predict-output',
        question: 'What will be printed by the following code?',
        codeSnippet: `int i = 5;\nprintf("%d ", i++);\nprintf("%d", ++i);`,
        options: ['5 6', '5 7', '6 6', '6 7'],
        correctOptionIndex: 1,
        explanation: 'i++ (post-increment) prints 5, then increments i to 6. Next, ++i (pre-increment) increments i to 7, then prints 7.',
        conceptNote: 'Post-increment uses value first, then increments. Pre-increment increments first, then uses value.'
      },
      {
        id: 'q4-3',
        type: 'conceptual',
        question: 'What does the "continue" statement do inside a loop?',
        options: [
          'Terminates the loop completely',
          'Skips the rest of the current iteration and advances to the next iteration',
          'Restarts the program from main()',
          'Pauses execution for 1 second'
        ],
        correctOptionIndex: 1,
        explanation: 'continue skips any remaining code in the current iteration and moves directly to the next loop cycle.',
        conceptNote: 'break exits the entire loop; continue skips only the active iteration.'
      }
    ]
  },
  ch05: {
    moduleId: 'ch05',
    title: 'Chapter 05: Functions & Recursion Quiz',
    description: 'Test your grasp of function prototypes, call by value, and recursion base conditions.',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q5-1',
        type: 'conceptual',
        question: 'In C, what is the default argument passing mechanism?',
        options: ['Call by Reference', 'Call by Name', 'Call by Value', 'Call by Pointer'],
        correctOptionIndex: 2,
        explanation: 'C always uses Call by Value by default. A copy of the argument is passed into the called function.',
        conceptNote: 'Modifying a parameter inside a function in call by value has zero effect on the caller variable.'
      },
      {
        id: 'q5-2',
        type: 'conceptual',
        question: 'What occurs if a recursive function does not define or reach a base case?',
        options: [
          'The function automatically returns 0',
          'Stack Overflow runtime crash due to unbounded stack frame growth',
          'The compiler rejects the code at compile time',
          'It converts into a while loop'
        ],
        correctOptionIndex: 1,
        explanation: 'Without a base case, recursive calls continue endlessly until all stack memory allocated to the program is exhausted, causing a stack overflow crash.',
        conceptNote: 'Base cases are essential stop conditions for recursion.'
      }
    ]
  },
  ch06: {
    moduleId: 'ch06',
    title: 'Chapter 06: Pointers Quiz',
    description: 'Assess memory addresses, pointer dereferencing (*), address-of (&), and swapping via Call by Reference.',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q6-1',
        type: 'predict-output',
        question: 'What is the value of *(&x) if int x = 45?',
        options: ['Memory address of x', '45', 'Pointer to x', '0'],
        correctOptionIndex: 1,
        explanation: '&x gets the address of x. * dereferences that address to read the value stored there, which is 45.',
        conceptNote: '* and & effectively cancel each other out: *(&x) == x.'
      },
      {
        id: 'q6-2',
        type: 'multiple-choice',
        question: 'Which function signature correctly defines a swap function that can modify the caller arguments?',
        options: [
          'void swap(int x, int y);',
          'void swap(int *x, int *y);',
          'int swap(int &x, int &y);',
          'void swap(int **x, int y);'
        ],
        correctOptionIndex: 1,
        explanation: 'void swap(int *x, int *y) receives pointer addresses (Call by Reference) allowing direct dereference swapping.',
        conceptNote: 'Pointers enable functions to mutate variables outside their local scope.'
      }
    ]
  },
  ch07: {
    moduleId: 'ch07',
    title: 'Chapter 07: Arrays Quiz',
    description: 'Test 0-based indexing, contiguous memory spacing, and pointer arithmetic with arrays.',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q7-1',
        type: 'conceptual',
        question: 'If ptr is an int pointer pointing to memory address 1000, and an int occupies 4 bytes, what is the address of (ptr + 1)?',
        options: ['1001', '1002', '1004', '1000'],
        correctOptionIndex: 2,
        explanation: 'Pointer arithmetic increments in steps of sizeof(type). For an int (4 bytes), ptr + 1 advances by 4 bytes to 1004.',
        conceptNote: 'ptr + n = address + (n * sizeof(*ptr)).'
      },
      {
        id: 'q7-2',
        type: 'true-false',
        question: 'For an array arr, arr[i] and *(arr + i) evaluate to the exact same value in C.',
        options: ['True', 'False'],
        correctOptionIndex: 0,
        explanation: 'True. In C, array indexing arr[i] is defined precisely as *(arr + i).',
        conceptNote: 'Array subscript notation is syntactic sugar for pointer offset dereferencing.'
      }
    ]
  },
  ch08: {
    moduleId: 'ch08',
    title: 'Chapter 08: Strings Quiz',
    description: 'Assess null character \\0, string manipulation, strlen, strcpy, and strcmp return values.',
    difficulty: 'Intermediate',
    questions: [
      {
        id: 'q8-1',
        type: 'conceptual',
        question: 'What character indicates the end of a string in C?',
        options: ['\\n (newline)', '\\0 (null character)', '$', 'EOF'],
        correctOptionIndex: 1,
        explanation: 'A string in C is a null-terminated char array. The \\0 character signals the string boundary.',
        conceptNote: '\\0 has ASCII value 0.'
      },
      {
        id: 'q8-2',
        type: 'predict-output',
        question: 'What is returned by strlen("Harry")?',
        options: ['5', '6', '4', 'Undefined'],
        correctOptionIndex: 0,
        explanation: 'strlen counts the number of characters excluding the terminating null character. "Harry" has 5 letters.',
        conceptNote: 'strlen() excludes \\0 from the count, but memory allocation must include 1 extra byte for it.'
      }
    ]
  },
  ch09: {
    moduleId: 'ch09',
    title: 'Chapter 09: Structures Quiz',
    description: 'Test structure declarations, member access, arrow operator (->), and typedef aliases.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q9-1',
        type: 'multiple-choice',
        question: 'If ptr is a pointer to a struct, which of the following is equivalent to (*ptr).id?',
        options: ['ptr.id', 'ptr->id', '&ptr.id', 'ptr::id'],
        correctOptionIndex: 1,
        explanation: 'The arrow operator (ptr->id) is C shorthand for dereferencing the pointer and accessing member id: (*ptr).id.',
        conceptNote: 'Arrow operator -> cleans up struct pointer member access syntax.'
      },
      {
        id: 'q9-2',
        type: 'conceptual',
        question: 'What is the purpose of the typedef keyword in C?',
        options: [
          'To dynamically allocate memory',
          'To define an alias or alternate nickname for an existing data type',
          'To convert float variables into integers',
          'To declare functions without prototypes'
        ],
        correctOptionIndex: 1,
        explanation: 'typedef provides a new alias name for an existing data type (e.g., typedef struct Employee Employee;).',
        conceptNote: 'typedef improves readability and reduces boilerplate.'
      }
    ]
  },
  ch10: {
    moduleId: 'ch10',
    title: 'Chapter 10: File I/O Quiz',
    description: 'Assess FILE pointers, modes ("r", "w", "a"), EOF detection, and safe stream closing.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q10-1',
        type: 'multiple-choice',
        question: 'What value does fopen() return if the requested file cannot be found or opened?',
        options: ['0', '-1', 'NULL', 'EOF'],
        correctOptionIndex: 2,
        explanation: 'If fopen fails, it returns the NULL pointer. Always verify if (ptr == NULL).',
        conceptNote: 'Checking for NULL prevents segmentation faults when attempting to read missing files.'
      },
      {
        id: 'q10-2',
        type: 'conceptual',
        question: 'What does fgetc() return when it reaches the end of a file?',
        options: ['NULL', '0', 'EOF', '\\0'],
        correctOptionIndex: 2,
        explanation: 'fgetc() returns the EOF (End Of File) macro when the file stream has been fully read.',
        conceptNote: 'EOF is an integer constant typically equal to -1.'
      }
    ]
  },
  ch11: {
    moduleId: 'ch11',
    title: 'Chapter 11: Dynamic Memory Allocation Quiz',
    description: 'Master heap memory, malloc vs calloc initialization, realloc, and free to prevent leaks.',
    difficulty: 'Advanced',
    questions: [
      {
        id: 'q11-1',
        type: 'multiple-choice',
        question: 'What is the key difference between malloc() and calloc()?',
        options: [
          'malloc zeroes out memory, calloc leaves garbage values',
          'calloc initializes all allocated bytes to 0, while malloc leaves garbage values',
          'calloc allocates on the stack, malloc on the heap',
          'malloc is deprecated in modern C'
        ],
        correctOptionIndex: 1,
        explanation: 'calloc zeroes out every byte in the allocated block, whereas malloc leaves existing memory contents uninitialized (garbage values).',
        conceptNote: 'calloc takes two parameters: number of items and size per item.'
      },
      {
        id: 'q11-2',
        type: 'conceptual',
        question: 'What catastrophic software issue occurs if dynamically allocated heap memory is never freed?',
        options: ['Segmentation fault', 'Memory leak', 'Syntax error', 'Buffer overflow'],
        correctOptionIndex: 1,
        explanation: 'Failing to call free() causes allocated memory to remain occupied even when no longer needed, resulting in a memory leak that can crash the system.',
        conceptNote: 'Every malloc/calloc call should have a matching free() when no longer needed.'
      }
    ]
  }
};
