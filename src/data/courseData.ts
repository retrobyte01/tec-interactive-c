export interface CodeExample {
  title: string;
  code: string;
  description: string;
  output?: string;
  runnable?: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  callout?: {
    type: 'note' | 'tip' | 'warning' | 'important';
    title: string;
    text: string;
  };
}

export interface Lesson {
  id: string;
  moduleId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  readingTimeMinutes: number;
  summary: string;
  objectives: string[];
  sections: LessonSection[];
  keyTakeaways: string[];
  practiceProblems: {
    question: string;
    hint?: string;
    starterCode?: string;
    solution?: string;
  }[];
}

export interface CourseModule {
  id: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  iconName: string;
  color: string;
  folderColor: string;
  lessons: Lesson[];
  hasMiniProject?: boolean;
  miniProjectTitle?: string;
  miniProjectDescription?: string;
}

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 'ch01',
    chapterNumber: 1,
    title: 'Variables, Constants & Keywords',
    subtitle: 'The Core Building Blocks',
    description: 'Learn what programming is, Dennis Ritchie’s vision, basic C program syntax, variables, naming rules, data types, and I/O functions.',
    badge: 'Beginner',
    iconName: 'Terminal',
    color: '#007AFF',
    folderColor: '#007AFF',
    lessons: [
      {
        id: 'ch01-01',
        moduleId: 'ch01',
        chapterNumber: 1,
        title: 'Introduction to Programming & C',
        slug: 'introduction-to-c',
        readingTimeMinutes: 6,
        summary: 'Understand what programming is, why C was developed at AT&T Bell Labs in 1972, and where C powers the modern world.',
        objectives: [
          'Understand communication between humans and computers via programming',
          'Learn the origins and speed advantages of Dennis Ritchie’s C language',
          'Explore operating systems, IoT, and embedded systems powered by C',
          'Set up the GCC compiler and VS Code editing workflow'
        ],
        sections: [
          {
            id: 'what-is-programming',
            title: 'What is Programming & What is C?',
            content: `Programming is a method of communicating with computers by giving them precise instructions to perform specific tasks. Just like humans use languages like English or Hindi, programming languages allow us to command machines with surgical accuracy.\n\nDeveloped by **Dennis Ritchie** at **AT&T Bell Labs in 1972**, C is one of the foundational programming languages of the computer age. It combines high-level structured programming with the low-level capability of hardware memory access.`,
            callout: {
              type: 'important',
              title: 'Dennis Ritchie’s Legacy',
              text: 'C was created to develop the UNIX operating system. Modern languages like C++, Java, JavaScript, Python (CPython), and Rust draw inspiration directly from C syntax.'
            }
          },
          {
            id: 'uses-of-c',
            title: 'Modern Real-World Uses of C',
            content: `1. **Operating Systems**: Windows, Linux kernel, macOS Darwin core, and Android HAL are written predominantly in C.\n2. **Device Drivers & Embedded**: Network cards, graphics cards, and microcontrollers directly interface through C.\n3. **IoT & Automotive**: Microcontrollers, medical cameras, engine control units (ECU), and avionics.\n4. **High Performance**: Game engines, high-frequency trading platforms, and database kernels (PostgreSQL, SQLite).`
          },
          {
            id: 'compiler-concept',
            title: 'How C Code Runs: Source to Machine Code',
            content: `A C program is written in human-readable plain text (\`.c\` file). Computers only understand binary machine code (0s and 1s). The compiler (such as **GCC - GNU Compiler Collection**) analyzes syntax, checks types, optimizes instructions, and compiles the code into an executable (\`.exe\` or ELF binary).`,
            codeExamples: [
              {
                title: 'Compilation Command in Terminal',
                code: `// Compile main.c into an executable named tec_app\ngcc main.c -o tec_app\n\n// Run the compiled binary\n./tec_app`,
                description: 'The GCC compiler command line workflow converts C source into an executable native application.',
                runnable: false
              }
            ]
          }
        ],
        keyTakeaways: [
          'C provides direct hardware access with exceptional speed and minimal runtime overhead.',
          'Dennis Ritchie developed C at AT&T Bell Labs in 1972 for Unix.',
          'Compilers translate high-level C instructions into native machine code.'
        ],
        practiceProblems: [
          {
            question: 'Name three operating systems whose kernels are primarily written in C.',
            hint: 'Think of open-source and desktop operating systems.'
          }
        ]
      },
      {
        id: 'ch01-02',
        moduleId: 'ch01',
        chapterNumber: 1,
        title: 'Variables, Constants, Keywords & First Program',
        slug: 'variables-constants-first-program',
        readingTimeMinutes: 9,
        summary: 'Master variables as memory containers, naming rules, the 32 C keywords, standard structure, comments, and printf/scanf.',
        objectives: [
          'Define variables and understand their memory allocation',
          'Learn the 4 golden rules for variable naming in C',
          'Identify the 32 reserved keywords in C',
          'Write and dissect your first "Hello, World!" program',
          'Read and print values using printf, scanf, and format specifiers'
        ],
        sections: [
          {
            id: 'variables-and-rules',
            title: 'Variables & Naming Rules',
            content: `A **variable** is a named container that holds a value in computer memory. Variables make software dynamic because their stored values can change during execution.\n\n### Rules for Naming Variables:\n1. The first character must be an alphabet or underscore (\`_\`). Numbers cannot be the first character.\n2. No special characters allowed except underscore (\`_\`). No spaces or hyphens.\n3. Variable names are **case-sensitive** (\`age\` and \`Age\` are different).\n4. Reserved keywords cannot be used as variable names.`,
            codeExamples: [
              {
                title: 'Variable Declarations',
                code: `#include <stdio.h>\n\nint main() {\n    int studentAge = 20;\n    float examScore = 94.5;\n    char grade = 'A';\n\n    printf("Age: %d, Score: %.1f, Grade: %c\\n", studentAge, examScore, grade);\n    return 0;\n}`,
                description: 'Declaring integer, floating-point, and character variables with standard printf format specifiers.',
                output: 'Age: 20, Score: 94.5, Grade: A',
                runnable: true
              }
            ]
          },
          {
            id: 'keywords-table',
            title: 'The 32 C Keywords',
            content: `Keywords are reserved words whose meaning is already explained to the C compiler. You cannot redefine or use them as identifiers:\n\n\`auto\`, \`break\`, \`case\`, \`char\`, \`const\`, \`continue\`, \`default\`, \`do\`, \`double\`, \`else\`, \`enum\`, \`extern\`, \`float\`, \`for\`, \`goto\`, \`if\`, \`int\`, \`long\`, \`register\`, \`return\`, \`short\`, \`signed\`, \`sizeof\`, \`static\`, \`struct\`, \`switch\`, \`typedef\`, \`union\`, \`unsigned\`, \`void\`, \`volatile\`, \`while\`.`
          },
          {
            id: 'structure-of-c',
            title: 'Structure of a C Program & Comments',
            content: `Every C program adheres to an established architecture:\n1. Preprocessor directives (\`#include <stdio.h>\`)\n2. Execution entry point: \`int main()\`\n3. Statements enclosed inside braces \`{ ... }\`\n4. Every statement terminates with a semicolon (\`;\`).\n5. Execution flows sequentially in the order written.\n\nComments document code and are skipped by the compiler:\n- Single-line: \`// comment\`\n- Multi-line: \`/* comment */\``,
            codeExamples: [
              {
                title: 'User Input with scanf() and & Operator',
                code: `#include <stdio.h>\n\nint main() {\n    int length, breadth;\n    printf("Enter rectangle length: ");\n    scanf("%d", &length);\n\n    printf("Enter rectangle breadth: ");\n    scanf("%d", &breadth);\n\n    int area = length * breadth;\n    printf("Calculated Area = %d sq units\\n", area);\n    return 0;\n}`,
                description: 'The ampersand (&) operator supplies the exact memory address where scanf stores user keyboard input.',
                runnable: true
              }
            ],
            callout: {
              type: 'warning',
              title: 'Critical scanf() & Pitfall',
              text: 'Always include & before variable names in scanf (except for string char arrays). Omitting & attempts to write to an invalid memory pointer, leading to a Segmentation Fault.'
            }
          }
        ],
        keyTakeaways: [
          'Variable names are case-sensitive and must begin with a letter or underscore.',
          'Every statement in C must end with a semicolon.',
          'printf uses %d, %f, and %c; scanf requires the & address-of operator.'
        ],
        practiceProblems: [
          {
            question: 'Write a C program to calculate the area of a rectangle with inputs supplied by user.',
            starterCode: `#include <stdio.h>\n\nint main() {\n    float length, breadth;\n    // Read input and compute area\n    return 0;\n}`,
            solution: `#include <stdio.h>\n\nint main() {\n    float length, breadth;\n    printf("Length: ");\n    scanf("%f", &length);\n    printf("Breadth: ");\n    scanf("%f", &breadth);\n    printf("Area = %.2f\\n", length * breadth);\n    return 0;\n}`
          },
          {
            question: 'Write a program to convert Celsius temperature to Fahrenheit.',
            hint: 'Formula: (Celsius * 9/5) + 32'
          },
          {
            question: 'Write a program to calculate Simple Interest: (Principal * Rate * Time) / 100.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch02',
    chapterNumber: 2,
    title: 'Instructions and Operators',
    subtitle: 'Expressions, Precedence & Math',
    description: 'Learn type declarations, arithmetic operators, type conversion rules, integer division quirks, and operator precedence and associativity.',
    badge: 'Beginner',
    iconName: 'Cpu',
    color: '#32ADE6',
    folderColor: '#32ADE6',
    lessons: [
      {
        id: 'ch02-01',
        moduleId: 'ch02',
        chapterNumber: 2,
        title: 'Instructions, Arithmetic & Type Conversion',
        slug: 'instructions-and-arithmetic',
        readingTimeMinutes: 8,
        summary: 'Explore type declarations, arithmetic operations, operator precedence, left-to-right associativity, and implicit type demotion.',
        objectives: [
          'Distinguish type declaration, arithmetic, and control instructions',
          'Understand integer division truncation: 5 / 2 = 2',
          'Master type promotion (int to float) and type demotion (float to int)',
          'Apply C operator precedence rules: 1st (*, /, %), 2nd (+, -), 3rd (=)'
        ],
        sections: [
          {
            id: 'type-declarations',
            title: 'Type Declaration Instructions',
            content: `In C, variables must be declared before they are used.\n\n\`\`\`c\nint a = 2, b = 3, c = 4;\nint j = a + b; // Valid: uses previously defined variables\n// float b = a + 3; float a = 1.1; // INVALID: a used before declaration\nint x, y, z;\nx = y = z = 50; // Valid: chained assignment\n\`\`\``
          },
          {
            id: 'arithmetic-instructions',
            title: 'Arithmetic Operators & Modulus',
            content: `C arithmetic operators:\n- Addition: \`+\`\n- Subtraction: \`-\`\n- Multiplication: \`*\`\n- Division: \`/\`\n- Modulus: \`%\` (returns remainder)\n\n### Important Rules:\n1. Modulus operator \`%\` works **only on integers**, never floats.\n2. The sign of the remainder in \`%\` strictly follows the numerator: \`-5 % 2 = -1\`, \`5 % -2 = 1\`.\n3. There is no exponentiation operator like \`^\` in C. Use \`pow(x, y)\` from \`<math.h>\`.`,
            codeExamples: [
              {
                title: 'Integer vs Float Division',
                code: `#include <stdio.h>\n\nint main() {\n    int a = 5, b = 2;\n    printf("5 / 2 as int = %d\\n", a / b); // Truncates decimal!\n    printf("5.0 / 2 as float = %.2f\\n", 5.0 / b);\n    printf("2 / 5 as int = %d\\n", 2 / 5); // Results in 0!\n    return 0;\n}`,
                description: 'Integer arithmetic produces integers; one operand must be float to retain precision.',
                output: '5 / 2 as int = 2\n5.0 / 2 as float = 2.50\n2 / 5 as int = 0',
                runnable: true
              }
            ],
            callout: {
              type: 'tip',
              title: 'Type Conversion Rule',
              text: 'int / int yields int. float / float yields float. int / float yields float. When 2 / 5 is evaluated, C discards the decimal, resulting in 0.'
            }
          },
          {
            id: 'operator-precedence',
            title: 'Operator Precedence and Associativity',
            content: `Standard BODMAS does not dictate C evaluation. Instead, C uses formal **operator precedence**:\n\n| Priority | Operators |\n| :--- | :--- |\n| 1st | \`*\`, \`/\`, \`%\` |\n| 2nd | \`+\`, \`-\` |\n| 3rd | \`=\` (Assignment) |\n\nWhen operators have equal priority, **associativity** decides order. In C, \`*\`, \`/\`, and \`%\` have **Left-to-Right** associativity.\n\nFor example:\n\`x * y / z\` evaluates as \`((x * y) / z)\`.\n\`x / y * z\` evaluates as \`((x / y) * z)\`.`,
            codeExamples: [
              {
                title: 'Step-by-step Expression Evaluation',
                code: `#include <stdio.h>\n\nint main() {\n    int x = 2, y = 3, z = 3, k = 1;\n    // Expression: 3 * x / y - z + k\n    // 1st: 3 * 2 = 6\n    // 2nd: 6 / 3 = 2\n    // 3rd: 2 - 3 = -1\n    // 4th: -1 + 1 = 0\n    int result = 3 * x / y - z + k;\n    printf("Result = %d\\n", result);\n    return 0;\n}`,
                description: 'Trace step-by-step arithmetic evaluation with left-to-right associativity.',
                output: 'Result = 0',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'Modulus % yields remainder and is restricted to integers.',
          'Integer division truncates fractional components without rounding.',
          'Multiplication, division, and modulus share top priority and evaluate left-to-right.'
        ],
        practiceProblems: [
          {
            question: 'What data type will 3.0 / 8 - 2 return?',
            hint: 'Recall arithmetic between float and int promotes to float.',
            solution: 'Floating point number (double/float)'
          },
          {
            question: 'Write a C program to check whether a given integer is divisible by 97 or not.',
            starterCode: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("Enter number: ");\n    scanf("%d", &num);\n    if (num % 97 == 0) {\n        printf("Divisible\\n");\n    } else {\n        printf("Not divisible\\n");\n    }\n    return 0;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch03',
    chapterNumber: 3,
    title: 'Conditional Instructions',
    subtitle: 'Decision Making & Control Flow',
    description: 'Direct code execution using if, if-else, else-if ladders, relational and logical operators, ternary operators, and switch-case statements.',
    badge: 'Core',
    iconName: 'GitFork',
    color: '#AF52DE',
    folderColor: '#AF52DE',
    lessons: [
      {
        id: 'ch03-01',
        moduleId: 'ch03',
        chapterNumber: 3,
        title: 'If-Else, Logical Operators & Switch Case',
        slug: 'conditionals-and-switch',
        readingTimeMinutes: 10,
        summary: 'Control program flow with conditions, truthiness in C, logical operators (&&, ||, !), and multi-way branch switch-case structures.',
        objectives: [
          'Formulate conditional branches with if, if-else, and else-if ladders',
          'Understand truthiness: In C, any non-zero value evaluates to TRUE, 0 is FALSE',
          'Use logical AND (&&), OR (||), and NOT (!)',
          'Avoid the classic assignment vs equality trap (if (a = 11))',
          'Implement efficient multi-way branching with switch-case'
        ],
        sections: [
          {
            id: 'if-else-fundamentals',
            title: 'If-Else Statement & Truthiness in C',
            content: `Conditional instructions allow code to make decisions based on runtime conditions.\n\nIn C, **any non-zero value is treated as TRUE**, and **0 is treated as FALSE**.\n\n### The Classic Trap:\nNotice the difference between \`==\` (equality check) and \`=\` (assignment operator):\n\`\`\`c\nint a = 10;\nif (a = 11) { // ASSIGNMENT! Assigns 11 to a; 11 is non-zero, so condition is TRUE!\n    printf("I am 11");\n}\n\`\`\``,
            callout: {
              type: 'warning',
              title: 'Caution: = vs ==',
              text: 'Writing `if (a = 11)` assigns 11 to `a` and returns 11. Since 11 is non-zero, the `if` body ALWAYS executes. Always use `==` for comparisons.'
            }
          },
          {
            id: 'logical-operators',
            title: 'Relational & Logical Operators',
            content: `Relational operators: \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`.\n\nLogical operators combine multiple conditions:\n- **AND (\`&&\`)**: True only when **both** conditions are true.\n- **OR (\`||\`)**: True when **at least one** condition is true.\n- **NOT (\`!\`)**: Inverts boolean state (\`!(3 == 3)\` evaluates to 0 / false).`,
            codeExamples: [
              {
                title: 'Student Pass / Fail Evaluation',
                code: `#include <stdio.h>\n\nint main() {\n    int math = 45, physics = 38, chemistry = 70;\n    float total = (math + physics + chemistry) / 3.0;\n\n    if (total >= 40 && math >= 33 && physics >= 33 && chemistry >= 33) {\n        printf("PASSED with %.1f%% average!\\n", total);\n    } else {\n        printf("FAILED. Requires 40%% total & 33%% per subject.\\n");\n    }\n    return 0;\n}`,
                description: 'Combining multiple criteria using the logical AND operator.',
                output: 'PASSED with 51.0% average!',
                runnable: true
              }
            ]
          },
          {
            id: 'ternary-and-switch',
            title: 'Ternary Operator & Switch Case',
            content: `The conditional or **ternary operator** offers concise shorthand:\n\`condition ? expr_if_true : expr_if_false;\`\n\n### Switch Case:\n\`switch-case\` tests an integer or character expression against predefined constant cases:`,
            codeExamples: [
              {
                title: 'Switch-Case Grade Evaluator',
                code: `#include <stdio.h>\n\nint main() {\n    char rating = 'B';\n    switch (rating) {\n        case 'A':\n            printf("Excellent performance!\\n");\n            break;\n        case 'B':\n            printf("Great job, keep it up!\\n");\n            break;\n        case 'C':\n            printf("Passed satisfactorily.\\n");\n            break;\n        default:\n            printf("Need improvement.\\n");\n    }\n    return 0;\n}`,
                description: 'The break statement prevents fall-through into subsequent cases.',
                output: 'Great job, keep it up!',
                runnable: true
              }
            ],
            callout: {
              type: 'important',
              title: 'Why `break;` is Essential',
              text: 'Without `break`, execution continues falling through into every subsequent case regardless of whether the match is true. Only omit `break` intentionally.'
            }
          }
        ],
        keyTakeaways: [
          'Any non-zero expression in C evaluates as TRUE; 0 evaluates as FALSE.',
          'Always use == for comparison and = for assignment.',
          'Switch expressions only accept integer or character constants.'
        ],
        practiceProblems: [
          {
            question: 'What is the output of: int a = 10; if (a = 11) printf("Yes"); else printf("No");',
            hint: 'The single = is an assignment expression.',
            solution: 'Yes (because a = 11 evaluates to 11, which is non-zero and true)'
          },
          {
            question: 'Write a C program to determine if a year entered by the user is a leap year.',
            hint: 'A leap year is divisible by 4, not divisible by 100, unless also divisible by 400.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch04',
    chapterNumber: 4,
    title: 'Loop Control Instructions',
    subtitle: 'Repetition, Iteration & Games',
    description: 'Automate repetitive operations using while loops, do-while loops, for loops, break, continue, and build the Number Guessing Game.',
    badge: 'Core',
    iconName: 'RotateCw',
    color: '#34C759',
    folderColor: '#34C759',
    hasMiniProject: true,
    miniProjectTitle: 'Mini Project 1: Number Guessing Game',
    miniProjectDescription: 'Build a game where the computer selects a secret number between 1 and 100, and gives higher/lower feedback until guessed.',
    lessons: [
      {
        id: 'ch04-01',
        moduleId: 'ch04',
        chapterNumber: 4,
        title: 'While, Do-While & For Loops',
        slug: 'loops-and-iterations',
        readingTimeMinutes: 11,
        summary: 'Master the three primary C loops, post vs pre-increment operators, break, continue, and build interactive games.',
        objectives: [
          'Understand loop conditions and prevent accidental infinite loops',
          'Learn pre-increment (++i) vs post-increment (i++)',
          'Explain why do-while loops are guaranteed to execute at least once',
          'Control iteration flow using break and continue',
          'Complete the Number Guessing Game mini-project'
        ],
        sections: [
          {
            id: 'while-and-increments',
            title: 'While Loops & Increment Operators',
            content: `Loops repeat instructions as long as a condition holds true.\n\n### Increment / Decrement Operators:\n- **Post-increment (\`i++\`)**: Use the current value of \`i\` first, then increment.\n- **Pre-increment (\`++i\`)**: Increment \`i\` first, then use the new value.\n\n\`\`\`c\nint i = 5;\nprintf("%d", i++); // Prints 5, then i becomes 6\nprintf("%d", ++i); // Increments i to 7, then prints 7\n\`\`\``,
            codeExamples: [
              {
                title: 'While Loop Example: Multiplication Table',
                code: `#include <stdio.h>\n\nint main() {\n    int n = 7, i = 1;\n    printf("Multiplication Table of %d:\\n", n);\n    while (i <= 10) {\n        printf("%d x %d = %d\\n", n, i, n * i);\n        i++;\n    }\n    return 0;\n}`,
                description: 'A standard while loop executes as long as i <= 10.',
                output: 'Multiplication Table of 7:\n7 x 1 = 7\n7 x 2 = 14\n...\n7 x 10 = 70',
                runnable: true
              }
            ]
          },
          {
            id: 'do-while-and-for',
            title: 'Do-While & For Loops',
            content: `A **do-while loop** tests its condition *after* executing the block. Therefore, it is guaranteed to run **at least once**.\n\nA **for loop** organizes initialization, condition check, and loop variable update in a clean single line:\n\`for (initialize; test_condition; update) { ... }\``,
            codeExamples: [
              {
                title: 'Break and Continue in Action',
                code: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        if (i == 5) {\n            continue; // Skip iteration when i is 5\n        }\n        if (i == 8) {\n            break; // Terminate loop entirely at 8\n        }\n        printf("%d ", i);\n    }\n    printf("\\nLoop finished.\\n");\n    return 0;\n}`,
                description: 'continue skips the remainder of the current iteration; break exits immediately.',
                output: '1 2 3 4 6 7 \nLoop finished.',
                runnable: true
              }
            ]
          },
          {
            id: 'project-number-guessing',
            title: 'Project 1: Number Guessing Game',
            content: `Here is the complete implementation of the **Number Guessing Game** from the handbook:`,
            codeExamples: [
              {
                title: 'Number Guessing Game (C Implementation)',
                code: `#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint main() {\n    int secretNumber, userGuess, attempts = 0;\n    srand(time(0));\n    secretNumber = (rand() % 100) + 1; // 1 to 100\n\n    printf("=== NUMBER GUESSING GAME ===\\n");\n    printf("I have generated a secret number between 1 and 100.\\n");\n\n    // In interactive mode, this runs a loop until guessed\n    int demoGuess = 65;\n    printf("Simulating guess: %d\\n", demoGuess);\n    if (demoGuess > secretNumber) {\n        printf("Lower number please!\\n");\n    } else if (demoGuess < secretNumber) {\n        printf("Higher number please!\\n");\n    } else {\n        printf("Congratulations! You guessed it in 1 attempt!\\n");\n    }\n    return 0;\n}`,
                description: 'Generates random target using rand() and srand(time(0)), testing user guesses.',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'While loops test condition upfront; do-while loops test condition after one execution.',
          'Post-increment (i++) uses then increments; pre-increment (++i) increments then uses.',
          'break exits the entire loop immediately; continue skips to the next iteration.'
        ],
        practiceProblems: [
          {
            question: 'How many times does a do-while loop execute if the test condition is initially false?',
            solution: 'At least once.'
          },
          {
            question: 'Write a program to calculate the factorial of a given integer using a for loop.',
            starterCode: `#include <stdio.h>\n\nint main() {\n    int n = 5, fact = 1;\n    for (int i = 1; i <= n; i++) {\n        fact *= i;\n    }\n    printf("Factorial of %d is %d\\n", n, fact);\n    return 0;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch05',
    chapterNumber: 5,
    title: 'Functions and Recursion',
    subtitle: 'Modular Code & Self-Calling Functions',
    description: 'Break complex logic into reusable functions, understand prototypes, call by value, parameter passing, and recursive algorithms like factorial and Fibonacci.',
    badge: 'Intermediate',
    iconName: 'Boxes',
    color: '#5856D6',
    folderColor: '#5856D6',
    lessons: [
      {
        id: 'ch05-01',
        moduleId: 'ch05',
        chapterNumber: 5,
        title: 'Function Architecture & Call by Value',
        slug: 'functions-and-call-by-value',
        readingTimeMinutes: 9,
        summary: 'Learn function prototypes, calls, definitions, parameters vs arguments, and why call by value protects caller variables.',
        objectives: [
          'Deconstruct function prototypes, calls, and definitions',
          'Differentiate formal parameters from actual arguments',
          'Understand call by value and memory isolation between stack frames',
          'Design reusable multi-function applications'
        ],
        sections: [
          {
            id: 'why-functions',
            title: 'Why Use Functions?',
            content: `As programs expand, writing everything in \`main()\` creates fragile, unmaintainable code. A **function** is a self-contained block of instructions that performs a dedicated task and can be executed whenever needed.\n\n### The Three Pillars of a Function:\n1. **Function Prototype**: Informs the compiler about function name, return type, and parameter types before its definition.\n2. **Function Call**: Directs the CPU to jump to the function instructions.\n3. **Function Definition**: The actual code implementation.`
          },
          {
            id: 'call-by-value-proof',
            title: 'Call by Value: Proof of Isolation',
            content: `In C, arguments are passed **by value** by default. A *copy* of the variable is placed onto the called function's stack frame. Modifications to the parameter inside the function **never** alter the original variable in \`main()\`.`,
            codeExamples: [
              {
                title: 'Demonstrating Call by Value',
                code: `#include <stdio.h>\n\nvoid attemptChange(int a) {\n    a = 99; // Alters only the local copy inside attemptChange\n    printf("Inside function: a = %d\\n", a);\n}\n\nint main() {\n    int b = 22;\n    attemptChange(b);\n    printf("Inside main after call: b = %d\\n", b); // Remains 22!\n    return 0;\n}`,
                description: 'The variable b in main() remains completely unchanged.',
                output: 'Inside function: a = 99\nInside main after call: b = 22',
                runnable: true
              }
            ],
            callout: {
              type: 'note',
              title: 'Parameters vs Arguments',
              text: 'Parameters are the variable placeholders listed in the function header (e.g., int a). Arguments are the concrete values passed during the function call (e.g., 22).'
            }
          }
        ],
        keyTakeaways: [
          'Prototypes declare function signatures before usage.',
          'Call by value passes copies of variables, keeping caller memory secure.',
          'Every C program begins and ends execution in the main() function.'
        ],
        practiceProblems: [
          {
            question: 'Write a C function to calculate the average of three float numbers.',
            starterCode: `float calculateAverage(float a, float b, float c) {\n    return (a + b + c) / 3.0;\n}`
          }
        ]
      },
      {
        id: 'ch05-02',
        moduleId: 'ch05',
        chapterNumber: 5,
        title: 'Recursion & The Base Case',
        slug: 'recursion-and-base-cases',
        readingTimeMinutes: 10,
        summary: 'Master self-referential functions, recursive call stacks, the crucial role of the base case, and factorial/Fibonacci evaluation.',
        objectives: [
          'Define recursion and understand how self-calling functions work',
          'Understand call stack accumulation and unwinding',
          'Learn the vital role of the base case in avoiding stack overflow',
          'Implement recursive solutions for Factorial and Fibonacci numbers'
        ],
        sections: [
          {
            id: 'recursion-explained',
            title: 'How Recursion Works',
            content: `Recursion occurs when a function calls itself to solve smaller sub-instances of the same problem.\n\nConsider mathematical Factorial: $n! = n \\times (n-1)!$.\nSince factorial of $n$ is defined in terms of factorial of $n-1$, we can implement it recursively.`,
            codeExamples: [
              {
                title: 'Recursive Factorial in C',
                code: `#include <stdio.h>\n\nlong long factorial(int n) {\n    // Base case: 0! = 1, 1! = 1\n    if (n == 0 || n == 1) {\n        return 1;\n    }\n    // Recursive step\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int num = 5;\n    printf("Factorial of %d = %lld\\n", num, factorial(num));\n    return 0;\n}`,
                description: 'Evaluates 5 * factorial(4) -> 4 * factorial(3)... down to base case.',
                output: 'Factorial of 5 = 120',
                runnable: true
              }
            ],
            callout: {
              type: 'important',
              title: 'The Base Case Rule',
              text: 'Every recursive function MUST possess at least one base case that terminates recursion. Without a base case, recursion runs indefinitely until available stack memory is consumed, triggering a Stack Overflow crash.'
            }
          }
        ],
        keyTakeaways: [
          'Recursion breaks a problem into smaller instances of itself.',
          'The base case is mandatory to stop recursive expansion.',
          'Each recursive call creates a new stack frame on the call stack.'
        ],
        practiceProblems: [
          {
            question: 'Write a recursive function to compute the nth element of the Fibonacci series (0, 1, 1, 2, 3, 5, 8...).',
            starterCode: `int fibonacci(int n) {\n    if (n <= 0) return 0;\n    if (n == 1) return 1;\n    return fibonacci(n - 1) + fibonacci(n - 2);\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch06',
    chapterNumber: 6,
    title: 'Pointers',
    subtitle: 'Memory Addresses & Low-Level Control',
    description: 'Demystify C’s most powerful feature: memory addresses, & and * operators, pointer types, pointer-to-pointer, and call by reference.',
    badge: 'Intermediate',
    iconName: 'Compass',
    color: '#FF9500',
    folderColor: '#FF9500',
    lessons: [
      {
        id: 'ch06-01',
        moduleId: 'ch06',
        chapterNumber: 6,
        title: 'Memory Addresses, & and * Operators',
        slug: 'pointers-basics-and-addresses',
        readingTimeMinutes: 10,
        summary: 'Understand memory bytes, the address-of operator &, the dereference operator *, and pointer declarations.',
        objectives: [
          'Understand how variables occupy concrete byte addresses in RAM',
          'Use the address-of operator (&) to obtain a variable address',
          'Use the dereference operator (*) to read and modify values at an address',
          'Inspect pointers using %p and %u format specifiers'
        ],
        sections: [
          {
            id: 'what-is-a-pointer',
            title: 'What is a Pointer?',
            content: `A **pointer** is a variable that stores the **memory address** of another variable in RAM.\n\nEvery variable in a computer has:\n1. A **Name** (e.g., \`i\`)\n2. A **Value** (e.g., \`72\`)\n3. A **Memory Address** in physical/virtual RAM (e.g., \`87994\`).\n\n### The Two Essential Operators:\n- **Address-Of Operator (\`&\`)**: Returns the memory address of a variable (\`&i\`).\n- **Dereference / Value-at-Address Operator (\`*\`)**: Reads the value residing at the address pointed to (\`*j\`).`,
            codeExamples: [
              {
                title: 'Comprehensive Pointer Demo',
                code: `#include <stdio.h>\n\nint main() {\n    int i = 8;\n    int *j = &i; // j stores the address of i\n\n    printf("Value of i: %d\\n", i);\n    printf("Address of i (&i): %p\\n", (void*)&i);\n    printf("Value stored in j: %p\\n", (void*)j);\n    printf("Value at address j (*j): %d\\n", *j);\n    printf("Address of pointer j (&j): %p\\n", (void*)&j);\n    return 0;\n}`,
                description: 'Demonstrating how a pointer variable stores an address and accesses value via dereferencing.',
                runnable: true
              }
            ]
          },
          {
            id: 'pointer-to-pointer',
            title: 'Pointer to a Pointer (Double Pointers)',
            content: `Since a pointer is itself a variable stored in memory, it has its own memory address. A variable that stores the address of another pointer is called a **pointer to a pointer** (\`**\`):\n\n\`\`\`c\nint i = 72;\nint *j = &i;   // j points to i\nint **k = &j;  // k points to j\n\nprintf("%d", **k); // Evaluates to 72!\n\`\`\``
          }
        ],
        keyTakeaways: [
          '& returns the address of a variable.',
          '* before a pointer dereferences it to access or modify the underlying value.',
          'Pointers have distinct types (int*, char*, float*) to know how many bytes to read.'
        ],
        practiceProblems: [
          {
            question: 'Write a program to print the value of a variable i using a pointer to pointer type variable.',
            starterCode: `#include <stdio.h>\n\nint main() {\n    int i = 42;\n    int *ptr1 = &i;\n    int **ptr2 = &ptr1;\n    printf("Value: %d\\n", **ptr2);\n    return 0;\n}`
          }
        ]
      },
      {
        id: 'ch06-02',
        moduleId: 'ch06',
        chapterNumber: 6,
        title: 'Call by Reference: Swapping Values',
        slug: 'call-by-reference-swap',
        readingTimeMinutes: 8,
        summary: 'Learn how passing pointer addresses enables functions to directly modify variables in the caller scope.',
        objectives: [
          'Contrast Call by Value with Call by Reference',
          'Pass memory addresses to functions using &',
          'Implement the classic in-place swap function',
          'Return multiple computed results from a function using pointers'
        ],
        sections: [
          {
            id: 'call-by-reference-explained',
            title: 'Call by Reference Explained',
            content: `Instead of passing raw values, **Call by Reference** passes the *memory addresses* of variables to a function. The function uses the dereference operator \`*\` to modify the variables directly in the caller's stack frame.`,
            codeExamples: [
              {
                title: 'Classic In-Place Swap via Call by Reference',
                code: `#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 3, b = 4;\n    printf("Before swap: a = %d, b = %d\\n", a, b);\n\n    swap(&a, &b); // Pass addresses using &\n\n    printf("After swap:  a = %d, b = %d\\n", a, b);\n    return 0;\n}`,
                description: 'The swap function modifies the variables in main() directly through their pointers.',
                output: 'Before swap: a = 3, b = 4\nAfter swap:  a = 4, b = 3',
                runnable: true
              }
            ],
            callout: {
              type: 'tip',
              title: 'Returning Multiple Values',
              text: 'In C, a function can only return a single value via the `return` statement. Call by reference allows a function to mutate multiple pointer arguments, effectively returning multiple results.'
            }
          }
        ],
        keyTakeaways: [
          'Call by reference passes addresses, allowing functions to mutate caller data.',
          'Dereferencing an address (*ptr) provides direct read/write access to that memory slot.'
        ],
        practiceProblems: [
          {
            question: 'Write a function that accepts two numbers and computes both their sum and average via pointers.',
            starterCode: `void sumAndAvg(int a, int b, int *sum, float *avg) {\n    *sum = a + b;\n    *avg = (float)(*sum) / 2.0;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch07',
    chapterNumber: 7,
    title: 'Arrays',
    subtitle: 'Contiguous Memory & Multidimensional Data',
    description: 'Master fixed collections in memory, array indexing, pointer arithmetic, passing arrays to functions, and 2D matrices.',
    badge: 'Intermediate',
    iconName: 'Grid',
    color: '#007AFF',
    folderColor: '#007AFF',
    lessons: [
      {
        id: 'ch07-01',
        moduleId: 'ch07',
        chapterNumber: 7,
        title: 'Arrays & Pointer Arithmetic',
        slug: 'arrays-and-pointer-arithmetic',
        readingTimeMinutes: 11,
        summary: 'Learn contiguous array memory layout, 0-based indexing, how pointers increment across types, and passing arrays to functions.',
        objectives: [
          'Declare and initialize 1D arrays in C',
          'Understand contiguous memory allocation (e.g., 4 bytes per integer)',
          'Master pointer arithmetic: ptr + 1 advances by sizeof(type)',
          'Pass arrays into functions using pointers'
        ],
        sections: [
          {
            id: 'array-memory-layout',
            title: 'Arrays in Contiguous Memory',
            content: `An **array** is a collection of elements of the same data type stored in **contiguous** (adjacent) memory locations.\n\n\`\`\`c\nint marks[3] = {10, 20, 30};\n\`\`\`\nIf an integer takes 4 bytes, \`marks[0]\` is at byte \`8000\`, \`marks[1]\` is at \`8004\`, and \`marks[2]\` is at \`8008\`.\n\nIndexing in C is always **0-based** (from \`0\` to \`size - 1\`).`,
            codeExamples: [
              {
                title: 'Array Input and Display',
                code: `#include <stdio.h>\n\nint main() {\n    int scores[4] = {85, 92, 78, 96};\n    printf("Array elements:\\n");\n    for (int i = 0; i < 4; i++) {\n        printf("Index %d: %d (Address: %p)\\n", i, scores[i], (void*)&scores[i]);\n    }\n    return 0;\n}`,
                description: 'Notice how each address is exactly 4 bytes higher than the preceding element.',
                runnable: true
              }
            ]
          },
          {
            id: 'pointer-arithmetic',
            title: 'Pointer Arithmetic',
            content: `When you increment a pointer (\`ptr++\`), it does **not** increase its memory address by 1 byte. Instead, it advances by the **size of the underlying data type**:\n- \`int *ptr\`: \`ptr++\` increases address by \`sizeof(int)\` (4 bytes).\n- \`char *ptr\`: \`ptr++\` increases address by \`sizeof(char)\` (1 byte).\n\n### The Fundamental Equivalence:\nIn C, the name of an array acts as a constant pointer to its first element:\n\`arr == &arr[0]\`\n\`*(arr + i) == arr[i]\``,
            codeExamples: [
              {
                title: 'Passing Arrays to Functions',
                code: `#include <stdio.h>\n\nvoid printArray(int *arr, int size) {\n    for (int i = 0; i < size; i++) {\n        printf("%d ", *(arr + i)); // Equivalent to arr[i]\n    }\n    printf("\\n");\n}\n\nint main() {\n    int numbers[] = {10, 20, 30, 40, 50};\n    printArray(numbers, 5);\n    return 0;\n}`,
                description: 'Arrays decay into pointers when passed to functions.',
                output: '10 20 30 40 50',
                runnable: true
              }
            ]
          },
          {
            id: 'multidimensional-arrays',
            title: '2D Arrays (Matrices)',
            content: `A 2D array is an array of arrays, representing rows and columns:\n\`\`\`c\nint matrix[2][3] = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\n\`\`\`\nEven 2D arrays are laid out in a single contiguous row-major block in memory.`
          }
        ],
        keyTakeaways: [
          'Arrays store identical types in contiguous sequential memory.',
          'arr[i] is syntactically identical to *(arr + i).',
          'Pointer increment advances by the byte size of the pointed type.'
        ],
        practiceProblems: [
          {
            question: 'If S is a 1-D array of integers, does *(S + 3) refer to the 3rd or 4th element?',
            solution: 'It refers to the 4th element (since indices start at 0: S+0 is 1st, S+1 is 2nd, S+2 is 3rd, S+3 is 4th).'
          },
          {
            question: 'Write a C function to reverse an integer array in place using two pointers.',
            starterCode: `void reverseArray(int *arr, int n) {\n    int left = 0, right = n - 1;\n    while (left < right) {\n        int temp = arr[left];\n        arr[left] = arr[right];\n        arr[right] = temp;\n        left++;\n        right--;\n    }\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch08',
    chapterNumber: 8,
    title: 'Strings',
    subtitle: 'Null-Terminated Character Arrays',
    description: 'Learn how C represents text, the null terminator \\0, gets and puts, pointer strings, and standard library string functions.',
    badge: 'Intermediate',
    iconName: 'FileText',
    color: '#32ADE6',
    folderColor: '#32ADE6',
    lessons: [
      {
        id: 'ch08-01',
        moduleId: 'ch08',
        chapterNumber: 8,
        title: 'Strings, Null Terminator & String Functions',
        slug: 'strings-null-terminator-and-library',
        readingTimeMinutes: 11,
        summary: 'Explore strings as null-terminated character arrays, difference between array strings and pointer strings, and string.h functions.',
        objectives: [
          'Define strings as char arrays terminated with null character \\0',
          'Recognize why string memory requires size + 1 bytes for \\0',
          'Differentiate scanf ("%s") from multi-word gets / fgets and puts',
          'Master <string.h> functions: strlen, strcpy, strcat, and strcmp',
          'Contrast char st[] with char *ptr reinitialization'
        ],
        sections: [
          {
            id: 'string-definition',
            title: 'The Null Character \\0',
            content: `C does not have a primitive \`string\` type. Instead, a **string** is a 1D character array terminated by a **null character (\`'\\0'\`)**.\n\nThe null character signals to the computer where the string ends in memory.\n\n\`\`\`c\nchar name[] = {'T', 'E', 'C', '\\0'}; // Explicit\nchar name[] = "TEC";                 // C appends '\\0' automatically\n\`\`\`\nFor string \`"TEC"\`, memory stores 4 bytes: \`'T'\`, \`'E'\`, \`'C'\`, and \`'\\0'\`.`,
            callout: {
              type: 'important',
              title: 'Always Reserve Extra Byte for \\0',
              text: 'If you want to store a string with 20 characters, your char array must be declared with size at least 21 to accommodate the null terminator.'
            }
          },
          {
            id: 'pointer-strings',
            title: 'Array Strings vs Pointer Strings',
            content: `1. **Array Strings**: \`char s[] = "Harry";\`\n   Allocates a fixed array. You cannot reassign the whole array (\`s = "Rohan"\` is illegal).\n2. **Pointer Strings**: \`char *ptr = "Harry";\`\n   Creates a pointer to a string literal in read-only memory. The pointer can be reassigned: \`ptr = "Rohan";\`.`
          },
          {
            id: 'string-library-functions',
            title: 'Standard String Functions (<string.h>)',
            content: `Include \`<string.h>\` to use standard string manipulation functions:\n\n1. **\`strlen(str)\`**: Returns number of characters, excluding \`'\\0'\`.\n2. **\`strcpy(dest, src)\`**: Copies contents of \`src\` into \`dest\`.\n3. **\`strcat(dest, src)\`**: Appends \`src\` onto the end of \`dest\` without adding spaces.\n4. **\`strcmp(s1, s2)\`**: Compares two strings character by character:\n   - Returns \`0\` if strings are identical.\n   - Negative if first mismatching character in \`s1\` has lower ASCII than \`s2\`.\n   - Positive if first mismatching character in \`s1\` has higher ASCII than \`s2\`.`,
            codeExamples: [
              {
                title: 'String Functions Demonstration',
                code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[30] = "Hello ";\n    char s2[] = "World!";\n\n    printf("Length of s1: %lu\\n", strlen(s1));\n    strcat(s1, s2);\n    printf("Concatenated: %s\\n", s1);\n\n    int cmp = strcmp("apple", "banana");\n    printf("strcmp('apple', 'banana'): %d (negative because 'a' < 'b')\\n", cmp);\n    return 0;\n}`,
                description: 'Manipulating strings using strlen, strcat, and strcmp.',
                output: 'Length of s1: 6\nConcatenated: Hello World!\nstrcmp(\'apple\', \'banana\'): -1',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'Strings are null-terminated character arrays.',
          'strlen() excludes \\0 in its count.',
          'strcmp returns 0 if both strings match in length and characters.'
        ],
        practiceProblems: [
          {
            question: 'Write your own custom implementation of strlen() without using <string.h>.',
            starterCode: `int customStrlen(char *s) {\n    int count = 0;\n    while (*s != '\\0') {\n        count++;\n        s++;\n    }\n    return count;\n}`
          },
          {
            question: 'Write a C program to encrypt a string by adding 1 to the ASCII value of each character.'
          }
        ]
      }
    ]
  },
  {
    id: 'ch09',
    chapterNumber: 9,
    title: 'Structures',
    subtitle: 'Custom Heterogeneous Data Types',
    description: 'Group dissimilar data under a single name, create arrays of structures, access members via pointer arrow operator ->, and use typedef aliases.',
    badge: 'Advanced',
    iconName: 'Layers',
    color: '#AF52DE',
    folderColor: '#AF52DE',
    lessons: [
      {
        id: 'ch09-01',
        moduleId: 'ch09',
        chapterNumber: 9,
        title: 'Structures, Arrow Operator -> & Typedef',
        slug: 'structures-and-typedef',
        readingTimeMinutes: 10,
        summary: 'Model complex entities with struct, access members through dot and arrow operators, and streamline declarations with typedef.',
        objectives: [
          'Understand why structures are needed for heterogeneous data',
          'Declare, initialize, and access structure fields',
          'Create arrays of structures in contiguous memory',
          'Use the arrow operator (->) to access struct members through pointers',
          'Use typedef to create concise type aliases'
        ],
        sections: [
          {
            id: 'what-is-a-structure',
            title: 'What is a Structure?',
            content: `While arrays hold elements of the *same* data type, a **structure** allows grouping variables of *different* data types together under a single user-defined type.\n\n\`\`\`c\nstruct Employee {\n    int id;\n    float salary;\n    char name[20];\n};\n\`\`\`\nEach instance of \`struct Employee\` stores its fields in contiguous memory.`,
            codeExamples: [
              {
                title: 'Creating and Accessing a Structure',
                code: `#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    int rollNo;\n    char name[30];\n    float gpa;\n};\n\nint main() {\n    struct Student s1 = {101, "Alice", 3.92};\n    printf("Student: %s (Roll: %d, GPA: %.2f)\\n", s1.name, s1.rollNo, s1.gpa);\n    return 0;\n}`,
                description: 'Initializing structure variables using curly brace initializers.',
                output: 'Student: Alice (Roll: 101, GPA: 3.92)',
                runnable: true
              }
            ]
          },
          {
            id: 'arrow-operator-and-typedef',
            title: 'The Arrow Operator (->) and Typedef',
            content: `When accessing structure members through a pointer, instead of writing \`(*ptr).member\`, C provides the clean **arrow operator (\`->\`)**:\n\`ptr->member\`\n\n### The Typedef Keyword:\n\`typedef\` assigns a new alias name to existing types, saving you from writing \`struct\` everywhere:`,
            codeExamples: [
              {
                title: 'Using Typedef and the Arrow Operator',
                code: `#include <stdio.h>\n\ntypedef struct Complex {\n    float real;\n    float imaginary;\n} ComplexNo; // ComplexNo is now a recognized type!\n\nvoid printComplex(ComplexNo *c) {\n    printf("%.1f + %.1fi\\n", c->real, c->imaginary);\n}\n\nint main() {\n    ComplexNo c1 = {3.5, 4.2};\n    printComplex(&c1); // Passes pointer, accesses via ->\n    return 0;\n}`,
                description: 'Using typedef to eliminate "struct" repetition and using -> for pointer member access.',
                output: '3.5 + 4.2i',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'Structures group heterogeneous data types together.',
          'The arrow operator (ptr->member) is shorthand for (*ptr).member.',
          'typedef creates concise aliases for custom data types.'
        ],
        practiceProblems: [
          {
            question: 'Create a structure representing a 2D vector and write a function sumVector to add two vectors.',
            starterCode: `typedef struct Vector {\n    int x;\n    int y;\n} Vector;\n\nVector sumVector(Vector v1, Vector v2) {\n    Vector result = {v1.x + v2.x, v1.y + v2.y};\n    return result;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch10',
    chapterNumber: 10,
    title: 'File Input / Output',
    subtitle: 'Persistent Data Storage & Streams',
    description: 'Break free from volatile RAM: open file streams, file modes (r, w, a), fscanf/fprintf, fgetc/fputc, EOF handling, and Project 2: Snake, Water, Gun.',
    badge: 'Advanced',
    iconName: 'HardDrive',
    color: '#FF9500',
    folderColor: '#FF9500',
    hasMiniProject: true,
    miniProjectTitle: 'Mini Project 2: Snake, Water, Gun Game',
    miniProjectDescription: 'Build the classic school game (Rock, Paper, Scissors) in C with random generation and winner evaluation.',
    lessons: [
      {
        id: 'ch10-01',
        moduleId: 'ch10',
        chapterNumber: 10,
        title: 'File Streams, Modes & Character I/O',
        slug: 'file-handling-modes-and-eof',
        readingTimeMinutes: 10,
        summary: 'Persist data beyond program termination with FILE pointers, open modes (r, w, a), formatted file I/O, and EOF detection.',
        objectives: [
          'Understand volatile RAM vs persistent disk storage',
          'Open files using fopen and close streams with fclose',
          'Distinguish file modes: "r", "w", "a", "rb", "wb"',
          'Detect End-Of-File (EOF) using fgetc in a while loop',
          'Build Mini Project 2: Snake, Water, Gun'
        ],
        sections: [
          {
            id: 'file-pointer-and-modes',
            title: 'The FILE Pointer & Opening Modes',
            content: `RAM is volatile; when your program terminates, all data in memory vanishes. To preserve data permanently, programs read and write to files on persistent storage.\n\nCommunication with a file happens through a **\`FILE\` pointer**:\n\`\`\`c\nFILE *ptr = fopen("data.txt", "r");\n\`\`\`\n\n### Primary File Modes:\n- **\`"r"\`**: Open for reading. Returns \`NULL\` if the file does not exist.\n- **\`"w"\`**: Open for writing. Creates the file if missing; **truncates/overwrites** if it exists.\n- **\`"a"\`**: Open for appending. Appends new data to the end without deleting existing content.`,
            callout: {
              type: 'warning',
              title: 'Always Check for NULL & Always fclose()',
              text: 'If a file fails to open, fopen returns NULL. Always verify `if (ptr == NULL)` before accessing it, and always call `fclose(ptr)` when done to flush buffers and release OS file locks.'
            }
          },
          {
            id: 'reading-writing-files',
            title: 'Reading and Writing with EOF',
            content: `Use **\`fscanf\`** and **\`fprintf\`** for formatted data, or **\`fgetc\`** and **\`fputc\`** for character-by-character operations.\n\nWhen \`fgetc()\` reaches the end of the file, it returns the special constant **\`EOF\`** (End Of File).`,
            codeExamples: [
              {
                title: 'Reading a File Until EOF',
                code: `#include <stdio.h>\n\nint main() {\n    FILE *ptr = fopen("sample.txt", "w");\n    if (ptr != NULL) {\n        fprintf(ptr, "TEC C Learning Platform\\n");\n        fclose(ptr);\n    }\n\n    // Read back character by character\n    ptr = fopen("sample.txt", "r");\n    if (ptr == NULL) {\n        printf("File not found!\\n");\n        return 1;\n    }\n\n    char ch;\n    printf("File contents:\\n");\n    while ((ch = fgetc(ptr)) != EOF) {\n        putchar(ch);\n    }\n    fclose(ptr);\n    return 0;\n}`,
                description: 'Demonstrating file creation, writing with fprintf, reading character-by-character with fgetc, and EOF check.',
                runnable: true
              }
            ]
          },
          {
            id: 'project-snake-water-gun',
            title: 'Project 2: Snake, Water, Gun Game',
            content: `The classic game where:\n- **Snake** drinks **Water** (Snake wins)\n- **Water** ruins **Gun** (Water wins)\n- **Gun** shoots **Snake** (Gun wins)`,
            codeExamples: [
              {
                title: 'Snake, Water, Gun C Implementation',
                code: `#include <stdio.h>\n#include <stdlib.h>\n#include <time.h>\n\nint determineWinner(char user, char comp) {\n    if (user == comp) return 0; // Draw\n    if ((user == 's' && comp == 'w') ||\n        (user == 'w' && comp == 'g') ||\n        (user == 'g' && comp == 's')) {\n        return 1; // User wins\n    }\n    return -1; // Computer wins\n}\n\nint main() {\n    char user = 's', comp = 'w'; // Snake vs Water\n    printf("Player chose: Snake\\nComputer chose: Water\\n");\n    int result = determineWinner(user, comp);\n    if (result == 1) printf("Result: Congratulations! You Win!\\n");\n    else if (result == -1) printf("Result: Computer Won!\\n");\n    else printf("Result: Game is a Draw!\\n");\n    return 0;\n}`,
                description: 'Complete logic for Project 2 from the handbook.',
                output: 'Player chose: Snake\nComputer chose: Water\nResult: Congratulations! You Win!',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'FILE pointers maintain open streams to external storage.',
          'Always check if fopen returned NULL before reading.',
          'fgetc returns EOF when the entire file has been read.'
        ],
        practiceProblems: [
          {
            question: 'Write a program to generate a multiplication table of a given number in a well-formatted text file.',
            starterCode: `#include <stdio.h>\n\nint main() {\n    FILE *f = fopen("table.txt", "w");\n    int n = 8;\n    for (int i = 1; i <= 10; i++) {\n        fprintf(f, "%d x %d = %d\\n", n, i, n * i);\n    }\n    fclose(f);\n    return 0;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'ch11',
    chapterNumber: 11,
    title: 'Dynamic Memory Allocation',
    subtitle: 'Heap Management: malloc, calloc, free & realloc',
    description: 'Allocate memory at runtime on the heap, understand memory leaks, allocate with malloc and calloc, deallocate with free, and resize blocks with realloc.',
    badge: 'Mastery',
    iconName: 'Cpu',
    color: '#34C759',
    folderColor: '#34C759',
    lessons: [
      {
        id: 'ch11-01',
        moduleId: 'ch11',
        chapterNumber: 11,
        title: 'Heap Allocation: malloc, calloc, free & realloc',
        slug: 'dynamic-memory-allocation-dma',
        readingTimeMinutes: 11,
        summary: 'Allocate heap memory dynamically during execution, initialize with calloc, prevent memory leaks using free, and resize blocks using realloc.',
        objectives: [
          'Contrast compile-time stack allocation with runtime heap allocation',
          'Allocate memory using malloc() and handle allocation failure (NULL)',
          'Understand how calloc() zeroes out memory blocks',
          'Prevent catastrophic memory leaks using free()',
          'Dynamically resize memory buffers using realloc()'
        ],
        sections: [
          {
            id: 'what-is-dma',
            title: 'Why Dynamic Memory Allocation?',
            content: `Normal C arrays have a fixed compile-time size: \`int arr[50];\`. You cannot change this size during runtime. If your user needs 51 elements, the program crashes; if they only need 5, 45 slots of memory are wasted.\n\n**Dynamic Memory Allocation (DMA)** allows allocating exact amounts of memory on the **Heap** while the program is running.`,
            callout: {
              type: 'important',
              title: 'Stack vs Heap',
              text: 'Stack memory is managed automatically by functions. Heap memory is managed manually by the programmer. You must explicitly release heap memory using `free()`!'
            }
          },
          {
            id: 'dma-functions',
            title: 'The 4 DMA Functions in <stdlib.h>',
            content: `1. **\`malloc(size_in_bytes)\`**: Allocates uninitialized memory. Returns a generic \`void*\` pointer. If memory is insufficient, returns \`NULL\`.\n2. **\`calloc(num_elements, size_of_each)\`**: Continuous allocation. Allocates contiguous blocks and initializes **all bytes to 0**.\n3. **\`free(ptr)\`**: Releases dynamically allocated memory back to the operating system.\n4. **\`realloc(ptr, new_size)\`**: Resizes previously allocated memory without losing existing data.`,
            codeExamples: [
              {
                title: 'malloc, realloc, and free Demonstration',
                code: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // Dynamically allocate space for 3 integers\n    int *ptr = (int*)malloc(3 * sizeof(int));\n    if (ptr == NULL) {\n        printf("Memory allocation failed!\\n");\n        return 1;\n    }\n\n    ptr[0] = 10; ptr[1] = 20; ptr[2] = 30;\n    printf("Original 3 elements: %d, %d, %d\\n", ptr[0], ptr[1], ptr[2]);\n\n    // Resize dynamically to 5 integers with realloc\n    ptr = (int*)realloc(ptr, 5 * sizeof(int));\n    ptr[3] = 40; ptr[4] = 50;\n\n    printf("Expanded to 5 elements: ");\n    for (int i = 0; i < 5; i++) {\n        printf("%d ", ptr[i]);\n    }\n    printf("\\n");\n\n    // Always free heap memory!\n    free(ptr);\n    ptr = NULL; // Good practice: prevent dangling pointer\n    printf("Memory freed successfully.\\n");\n    return 0;\n}`,
                description: 'Allocating on heap with malloc, resizing with realloc, and releasing with free.',
                output: 'Original 3 elements: 10, 20, 30\nExpanded to 5 elements: 10 20 30 40 50\nMemory freed successfully.',
                runnable: true
              }
            ]
          }
        ],
        keyTakeaways: [
          'malloc leaves allocated memory with garbage values; calloc zeroes it out.',
          'realloc adjusts buffer capacity without losing stored data.',
          'Always free() dynamically allocated memory to avoid memory leaks.'
        ],
        practiceProblems: [
          {
            question: 'Dynamically allocate an array of size 6 using malloc, populate with numbers, then resize to 10 with realloc.',
            starterCode: `int *arr = (int*)malloc(6 * sizeof(int));\n// populate arr...\narr = (int*)realloc(arr, 10 * sizeof(int));\n// free(arr);`
          }
        ]
      }
    ]
  }
];

export const ALL_LESSONS: Lesson[] = COURSE_MODULES.flatMap(m => m.lessons);

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find(l => l.id === id);
}

export function getModuleById(id: string): CourseModule | undefined {
  return COURSE_MODULES.find(m => m.id === id);
}

export function getAdjacentLessons(currentId: string): { prev?: Lesson; next?: Lesson } {
  const index = ALL_LESSONS.findIndex(l => l.id === currentId);
  return {
    prev: index > 0 ? ALL_LESSONS[index - 1] : undefined,
    next: index < ALL_LESSONS.length - 1 ? ALL_LESSONS[index + 1] : undefined,
  };
}
