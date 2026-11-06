import type { Challenge, CurriculumData, Lesson, Module } from '../types'

const challenge = (
  id: string,
  type: Challenge['type'],
  prompt: string,
  expected?: string,
  options?: string[],
  explanation = '',
  pass = true
): Challenge => ({ id, type, prompt, expected, options, explanation, pass })

export const curriculum: CurriculumData = {
  foundations: {
    id: 'foundations',
    title: 'Foundations',
    description: 'Learn how a C program is built from instructions, variables, and constants.',
    completed: false,
    lessons: [
      {
        id: 'hello-world',
        module: 'foundations',
        title: 'Hello, C',
        description: 'Your first executable program.',
        explanation:
          'Every C program starts at main(). The preprocessor brings in standard library declarations, and printf sends text to the terminal. Statements end with semicolons, and comments explain code without changing execution.',
        codeExample: {
          language: 'c',
          description: 'A minimal C program',
          code: '#include <stdio.h>\n\nint main(void) {\n    printf("Hello, C!\\n");\n    return 0;\n}',
          output: 'Hello, C!'
        },
        challenges: [
          challenge('hello-output', 'slots', 'Complete the line that displays Hello, C!', 'Hello, C!', undefined, 'The text inside double quotes is the string literal sent to the terminal.'),
          challenge('hello-question', 'multiple-choice', 'Which statement must end with a semicolon in C?', ['A function call', 'A variable name', 'A comment'], 'A function call', 'Statements and function calls end with semicolons; comments are ignored by the compiler.')
        ],
        practice: ['Change the message to your name.', 'Add a second printf statement.', 'Delete a semicolon and observe the compiler error.']
      },
      {
        id: 'program-structure',
        module: 'foundations',
        title: 'Program Structure',
        description: 'Understand how instructions execute in order.',
        explanation:
          'A C program is a sequence of instructions. Execution starts in main() and normally follows the written order. Each instruction must be syntactically complete and every statement ends with ;.',
        codeExample: {
          language: 'c',
          description: 'Ordered instructions',
          code: 'int a = 3;\nint b = 4;\nprintf("%d\\n", a + b);',
          output: '7'
        },
        challenges: [
          challenge('order-question', 'multiple-choice', 'What is the correct order for a statement?', ['declaration, semicolon, execution', 'semicolon, declaration, execution', 'execution, declaration, semicolon'], 'declaration, semicolon, execution', 'C statements have a fixed syntax and end with a semicolon.')
        ],
        practice: ['Draw the execution order of a three-line program.', 'Explain why main() is the entry point.']
      },
      {
        id: 'variables',
        module: 'foundations',
        title: 'Variables',
        description: 'Name a memory location and store a changing value.',
        explanation:
          'A variable is a named container for a value. The first character must be a letter or underscore, later characters may include digits, and names are case-sensitive. Choose names that describe the value.',
        codeExample: {
          language: 'c',
          description: 'Named containers',
          code: 'int age = 20;\nchar grade = \'A\';\nfloat price = 12.50;\nprintf("%d %c %.2f", age, grade, price);',
          output: '20 A 12.50'
        },
        challenges: [
          challenge('variable-value', 'slots', 'Store 42 in an integer variable named score.', 'int score = 42;', undefined, 'int declares an integer and score is the variable name.'),
          challenge('variable-name', 'multiple-choice', 'Which name is valid?', ['2score', 'my-score', 'score_1', 'score class'], 'score_1', 'A name can contain letters, digits, and underscores, but cannot start with a digit.')
        ],
        practice: ['Create variables for radius, height, and name.', 'Print each variable with the correct format specifier.']
      },
      {
        id: 'constants',
        module: 'foundations',
        title: 'Constants',
        description: 'Represent values that should not change.',
        explanation:
          'A constant is a value that does not change during execution. C constants can be integer, real, or character constants. The const qualifier can protect a variable from being changed after initialization.',
        codeExample: {
          language: 'c',
          description: 'A fixed value',
          code: '#include <stdio.h>\nint main(void) {\n    const int TAX_RATE = 5;\n    printf("Tax rate: %d%%\\n", TAX_RATE);\n    return 0;\n}',
          output: 'Tax rate: 5%'
        },
        challenges: [
          challenge('constant-type', 'multiple-choice', 'Which declaration creates a constant?', ['int x = 5;', 'const int x = 5;', 'x = const 5;', 'constant int x = 5;'], 'const int x = 5;', 'The const qualifier makes the variable read-only after initialization.')
        ],
        practice: ['Use a const value for PI.', 'Try changing a const value and note the compiler error.']
      },
      {
        id: 'keywords',
        module: 'foundations',
        title: 'Keywords',
        description: 'Reserve the language vocabulary.',
        explanation:
          'Keywords have special meaning to the compiler and cannot be reused as identifiers. C includes control-flow, storage, type, and function-control keywords such as int, return, if, while, struct, and typedef.',
        codeExample: {
          language: 'c',
          description: 'Reserved words in context',
          code: 'int count = 0;\nwhile (count < 3) {\n    count++;\n}\nprintf("%d", count);',
          output: '3'
        },
        challenges: [
          challenge('keyword-question', 'multiple-choice', 'Can a variable be named int?', ['Yes', 'No'], 'No', 'int is a keyword with a fixed meaning in C.')
        ],
        practice: ['List five keywords and explain one.', 'Rename a variable that uses a keyword-like name.']
      }
    ]
  },
  operators: {
    id: 'operators',
    title: 'Instructions & Operators',
    description: 'Build expressions and control the order in which C evaluates them.',
    completed: false,
    lessons: [
      {
        id: 'arithmetic',
        module: 'operators',
        title: 'Arithmetic Instructions',
        description: 'Add, subtract, multiply, divide, and use modulus.',
        explanation:
          'Arithmetic operators include +, -, *, /, and %. The % operator works with integer operands and returns the remainder. There is no exponentiation operator in C; use pow() from <math.h>.',
        codeExample: {
          language: 'c',
          description: 'Arithmetic operators',
          code: '#include <stdio.h>\nint main(void) {\n    int a = 10, b = 3;\n    printf("%d %d\\n", a / b, a % b);\n    return 0;\n}',
          output: '3 1'
        },
        challenges: [
          challenge('modulus', 'slots', 'Find 17 % 5.', '2', undefined, '17 divided by 5 leaves a remainder of 2.'),
          challenge('division', 'slots', 'What integer result does 5 / 2 produce?', '2', undefined, 'Integer division discards the fractional part.')
        ],
        practice: ['Calculate area using multiplication.', 'Use % to test whether a number is even.']
      },
      {
        id: 'type-conversion',
        module: 'operators',
        title: 'Type Conversion',
        description: 'See what happens when values move between types.',
        explanation:
          'When int and float values participate in an arithmetic expression, a float result is used. Assigning a float to an int loses the fractional part; assigning an int to a float preserves its value as a floating-point value.',
        codeExample: {
          language: 'c',
          description: 'Mixed arithmetic',
          code: '#include <stdio.h>\nint main(void) {\n    int a = 3;\n    float b = 8;\n    printf("%.1f\\n", b / a);\n    return 0;\n}',
          output: '2.7'
        },
        challenges: [
          challenge('float-result', 'multiple-choice', 'What is the type of 3.0 / 8 - 2?', ['integer', 'floating point', 'character'], 'floating point', 'The first operand is float, so the arithmetic result is float.')
        ],
        practice: ['Assign a decimal value to an integer and print it.', 'Explain why 2 / 5 becomes 0.']
      },
      {
        id: 'precedence',
        module: 'operators',
        title: 'Operator Precedence',
        description: 'Make expression evaluation explicit.',
        explanation:
          'Operators with higher precedence are evaluated first. Multiplication, division, and modulus come before addition and subtraction. Use parentheses to remove ambiguity and make the intended order clear.',
        codeExample: {
          language: 'c',
          description: 'Parentheses control order',
          code: '#include <stdio.h>\nint main(void) {\n    int x = 2, y = 3, z = 3;\n    printf("%d\\n", 3 * x / y - z + 1);\n    return 0;\n}',
          output: '1'
        },
        challenges: [
          challenge('precedence', 'slots', 'Complete the expression: 3 * x / y - z + ___', '1', undefined, 'Evaluate left to right at the same precedence level.')
        ],
        practice: ['Rewrite an expression with parentheses.', 'Predict the result before running the program.']
      },
      {
        id: 'control-instructions',
        module: 'operators',
        title: 'Control Instructions',
        description: 'Sequence, decide, loop, and branch.',
        explanation:
          'C controls execution with sequence, decision, loop, and case instructions. if, switch, while, do, for, break, and continue determine which instructions run and how often.',
        codeExample: {
          language: 'c',
          description: 'A decision',
          code: '#include <stdio.h>\nint main(void) {\n    int age = 20;\n    if (age >= 18) printf("Eligible\\n");\n    return 0;\n}',
          output: 'Eligible'
        },
        challenges: [
          challenge('control-type', 'multiple-choice', 'Which instruction repeats while a condition is true?', ['if', 'while', 'return'], 'while', 'A while loop repeats its block while its condition remains true.')
        ],
        practice: ['Draw a flow for an if statement.', 'Create a loop that stops at zero.']
      }
    ]
  },
  conditionals: {
    id: 'conditionals',
    title: 'Conditional Instructions',
    description: 'Make decisions with if, else, logical operators, and switch.',
    completed: false,
    lessons: [
      {
        id: 'if-else',
        module: 'conditionals',
        title: 'if–else Statement',
        description: 'Choose between two paths.',
        explanation:
          'An if statement runs a block when its condition is true. An else block runs when it is false. The condition may be any valid expression; in C, a non-zero value is considered true.',
        codeExample: {
          language: 'c',
          description: 'A simple decision',
          code: '#include <stdio.h>\nint main(void) {\n    int a = 23;\n    if (a > 18) printf("you can drive\\n");\n    return 0;\n}',
          output: 'you can drive'
        },
        challenges: [
          challenge('if-condition', 'slots', 'Check whether age is greater than or equal to 18: age ___ 18', '>=', undefined, '>= means greater than or equal to.')
        ],
        practice: ['Write a pass/fail test.', 'Add an else branch that prints a different message.']
      },
      {
        id: 'logical-operators',
        module: 'conditionals',
        title: 'Logical Operators',
        description: 'Combine true and false conditions.',
        explanation:
          '&& is AND, || is OR, and ! is NOT. AND is true only when both conditions are true, OR is true when at least one condition is true, and NOT reverses a boolean value.',
        codeExample: {
          language: 'c',
          description: 'Logical conditions',
          code: '#include <stdio.h>\nint main(void) {\n    int ready = 1, paid = 0;\n    if (ready && paid) printf("Start\\n");\n    return 0;\n}',
          output: ''
        },
        challenges: [
          challenge('and-operator', 'slots', 'Write AND between two conditions: ready ___ paid', '&&', undefined, '&& evaluates true only when both operands are true.')
        ],
        practice: ['Combine two tests with ||.', 'Explain why !(3 == 3) is false.']
      },
      {
        id: 'else-if',
        module: 'conditionals',
        title: 'else-if Ladder',
        description: 'Handle several ordered possibilities.',
        explanation:
          'An else-if ladder lets you test multiple conditions without nesting many if statements. The first matching condition runs, and the final else runs only when all conditions fail.',
        codeExample: {
          language: 'c',
          description: 'Grade ladder',
          code: '#include <stdio.h>\nint main(void) {\n    int marks = 76;\n    if (marks >= 90) printf("A");\n    else if (marks >= 80) printf("B");\n    else if (marks >= 70) printf("C");\n    else printf("D");\n    return 0;\n}',
          output: 'C'
        },
        challenges: [
          challenge('else-if', 'multiple-choice', 'What happens if no else-if matches?', ['The program stops', 'The final else runs', 'The compiler errors'], 'The final else runs', 'A final else provides a fallback path.')
        ],
        practice: ['Build a tax-slab decision.', 'Create a grade ladder with four ranges.']
      },
      {
        id: 'switch',
        module: 'conditionals',
        title: 'switch Case',
        description: 'Select from discrete choices.',
        explanation:
          'switch compares an integer expression with case labels. If a case matches, execution continues through subsequent cases until a break. A default label handles unmatched values.',
        codeExample: {
          language: 'c',
          description: 'Menu choice',
          code: '#include <stdio.h>\nint main(void) {\n    int choice = 2;\n    switch (choice) {\n        case 1: printf("Snake"); break;\n        case 2: printf("Water"); break;\n        default: printf("Gun");\n    }\n    return 0;\n}',
          output: 'Water'
        },
        challenges: [
          challenge('switch-case', 'slots', 'Which keyword handles unmatched switch values?', 'default', undefined, 'default is executed when no case label matches.')
        ],
        practice: ['Replace an else-if ladder with switch.', 'Add a default message for invalid input.']
      }
    ]
  },
  loops: {
    id: 'loops',
    title: 'Loop Control',
    description: 'Repeat work with while, do-while, and for.',
    completed: false,
    lessons: [
      {
        id: 'while-loop',
        module: 'loops',
        title: 'while Loop',
        description: 'Repeat while a condition stays true.',
        explanation:
          'A while loop checks its condition before each iteration. If the condition is true, the block runs; if it never becomes false, the loop is infinite.',
        codeExample: {
          language: 'c',
          description: 'Counting loop',
          code: '#include <stdio.h>\nint main(void) {\n    int i = 0;\n    while (i < 3) printf("%d\\n", i++);\n    return 0;\n}',
          output: '0 1 2'
        },
        challenges: [
          challenge('while-condition', 'slots', 'Complete: while (i ___ 3)', '<', undefined, 'The loop runs while i is less than 3.')
        ],
        practice: ['Print numbers from 1 to 10.', 'Write a loop that stops when input is zero.']
      },
      {
        id: 'do-while',
        module: 'loops',
        title: 'do-while Loop',
        description: 'Run at least once before checking.',
        explanation:
          'A do-while loop checks its condition after the body. It always executes the body at least once, even when the condition is initially false.',
        codeExample: {
          language: 'c',
          description: 'Repeated input',
          code: '#include <stdio.h>\nint main(void) {\n    int n = 0;\n    do { printf("Enter a number: "); scanf("%d", &n); } while (n <= 0);\n    return 0;\n}',
          output: 'Enter a number:'
        },
        challenges: [
          challenge('do-while', 'multiple-choice', 'A do-while loop executes at least:', ['once', 'twice', 'zero times'], 'once', 'The condition is evaluated after the first iteration.')
        ],
        practice: ['Print the first n natural numbers with do-while.', 'Read input until a valid value is entered.']
      },
      {
        id: 'for-loop',
        module: 'loops',
        title: 'for Loop',
        description: 'Initialize, test, and update in one place.',
        explanation:
          'A for loop combines initialization, a test condition, and an increment or decrement. It is ideal when the number of iterations is known or naturally counted.',
        codeExample: {
          language: 'c',
          description: 'Countdown',
          code: '#include <stdio.h>\nint main(void) {\n    for (int i = 5; i > 0; i--) printf("%d\\n", i);\n    return 0;\n}',
          output: '5 4 3 2 1'
        },
        challenges: [
          challenge('for-parts', 'slots', 'Which for-loop part runs after each iteration?', 'increment', undefined, 'The increment expression updates the loop counter.')
        ],
        practice: ['Print 1 through n.', 'Print a multiplication table in reverse.']
      },
      {
        id: 'break-continue',
        module: 'loops',
        title: 'break & continue',
        description: 'Control loop execution.',
        explanation:
          'break exits a loop immediately. continue skips the rest of the current iteration and moves to the next one. Use both to make loops easier to reason about.',
        codeExample: {
          language: 'c',
          description: 'Skip a value',
          code: '#include <stdio.h>\nint main(void) {\n    for (int i = 1; i <= 6; i++) {\n        if (i == 3) continue;\n        printf("%d ", i);\n    }\n    return 0;\n}',
          output: '1 2 4 5 6 '
        },
        challenges: [
          challenge('break', 'multiple-choice', 'Which statement exits a loop?', ['continue', 'break', 'return only'], 'break', 'break transfers control outside the loop.')
        ],
        practice: ['Skip a number in a loop.', 'Stop searching when a match is found.']
      }
    ]
  },
  functions: {
    id: 'functions',
    title: 'Functions & Recursion',
    description: 'Reuse logic, pass values, and solve problems recursively.',
    completed: false,
    lessons: [
      {
        id: 'function-basics',
        module: 'functions',
        title: 'Function Basics',
        description: 'Break a program into reusable blocks.',
        explanation:
          'A function is a named block that performs a task. Execution begins in main(), calls transfer control to another function, and return sends control back. A prototype declares a function before its definition.',
        codeExample: {
          language: 'c',
          description: 'Reusable display',
          code: '#include <stdio.h>\nvoid display(void) { printf("hi\\n"); }\nint main(void) { display(); return 0; }',
          output: 'hi'
        },
        challenges: [
          challenge('function-call', 'slots', 'Call display() from main: ___();', 'display', undefined, 'A function call executes the named block.')
        ],
        practice: ['Create three greeting functions.', 'Refactor repeated code into a function.']
      },
      {
        id: 'parameters',
        module: 'functions',
        title: 'Parameters & Arguments',
        description: 'Pass values into and out of functions.',
        explanation:
          'Parameters are placeholders in a function definition; arguments are the actual values supplied at a call. A function can return one value, and C normally passes arguments by value.',
        codeExample: {
          language: 'c',
          description: 'A sum function',
          code: '#include <stdio.h>\nint sum(int a, int b) { return a + b; }\nint main(void) { printf("%d", sum(2, 3)); return 0; }',
          output: '5'
        },
        challenges: [
          challenge('sum-function', 'slots', 'Return the sum of a and b: return ___;', 'a + b', undefined, 'The return expression sends a value back to the caller.')
        ],
        practice: ['Write a function that converts Celsius to Fahrenheit.', 'Write a function that calculates force.']
      },
      {
        id: 'call-by-value',
        module: 'functions',
        title: 'Call by Value',
        description: 'Understand copied arguments.',
        explanation:
          'In call by value, a copy of each argument is passed. Changing a parameter inside the function does not change the caller’s original variable.',
        codeExample: {
          language: 'c',
          description: 'A copied value',
          code: '#include <stdio.h>\nvoid change(int a) { a = 77; }\nint main(void) { int b = 22; change(b); printf("b is %d", b); return 0; }',
          output: 'b is 22'
        },
        challenges: [
          challenge('copy-value', 'multiple-choice', 'What happens to b after change(b)?', ['It becomes 77', 'It remains 22', 'It becomes undefined'], 'It remains 22', 'The function receives a copy, not the original variable.')
        ],
        practice: ['Predict the output of a call-by-value example.', 'Try changing a parameter and observe the caller.']
      },
      {
        id: 'recursion',
        module: 'functions',
        title: 'Recursion',
        description: 'Solve a problem by reducing it.',
        explanation:
          'Recursion occurs when a function calls itself. A base case stops further calls; the recursive case reduces the problem toward that base case. Missing or incorrect base cases can cause infinite recursion.',
        codeExample: {
          language: 'c',
          description: 'Factorial by recursion',
          code: '#include <stdio.h>\nint factorial(int x) {\n    if (x == 0 || x == 1) return 1;\n    return x * factorial(x - 1);\n}\nint main(void) { printf("%d", factorial(5)); return 0; }',
          output: '120'
        },
        challenges: [
          challenge('base-case', 'slots', 'Which condition stops factorial recursion?', 'x == 0 || x == 1', undefined, 'The base case returns without another recursive call.')
        ],
        practice: ['Write recursive sum and Fibonacci functions.', 'Trace factorial(5) on paper.']
      }
    ]
  },
  pointers: {
    id: 'pointers',
    title: 'Pointers',
    description: 'Think in addresses and values stored at addresses.',
    completed: false,
    lessons: [
      {
        id: 'address-of',
        module: 'pointers',
        title: 'Address of &',
        description: 'Obtain the memory address of a variable.',
        explanation:
          'The address-of operator & returns where a variable is stored. A pointer is a variable that stores an address. The %p format specifier is commonly used to display pointer addresses.',
        codeExample: {
          language: 'c',
          description: 'Address and value',
          code: '#include <stdio.h>\nint main(void) {\n    int i = 8;\n    int *j = &i;\n    printf("%p %d\\n", &i, *j);\n    return 0;\n}',
          output: 'address 8'
        },
        challenges: [
          challenge('address-operator', 'slots', 'Get the address of i: ___i', '&', undefined, 'The & operator returns the address of its operand.')
        ],
        practice: ['Print the address and value of a variable.', 'Declare a pointer to a character.']
      },
      {
        id: 'dereference',
        module: 'pointers',
        title: 'Dereference *',
        description: 'Read or modify the value at an address.',
        explanation:
          'The unary * operator dereferences a pointer and accesses the value stored at its address. The expression *(&i) is the value of i.',
        codeExample: {
          language: 'c',
          description: 'Dereferencing',
          code: '#include <stdio.h>\nint main(void) {\n    int i = 8;\n    int *j = &i;\n    printf("%d", *j);\n    return 0;\n}',
          output: '8'
        },
        challenges: [
          challenge('dereference', 'slots', 'Read the value stored at pointer p: ___p', '*', undefined, 'The * operator obtains the value at the pointer address.')
        ],
        practice: ['Use a pointer to change a variable.', 'Compare *p and p in output.']
      },
      {
        id: 'pointer-to-pointer',
        module: 'pointers',
        title: 'Pointer to Pointer',
        description: 'Point at a pointer.',
        explanation:
          'A pointer can store the address of another pointer. Use multiple * operators to declare and dereference pointer-to-pointer variables.',
        codeExample: {
          language: 'c',
          description: 'Nested pointers',
          code: '#include <stdio.h>\nint main(void) {\n    int i = 8;\n    int *j = &i;\n    int **k = &j;\n    printf("%d", **k);\n    return 0;\n}',
          output: '8'
        },
        challenges: [
          challenge('pointer-level', 'slots', 'Declare a pointer to pointer: int ___k;', '**', undefined, 'Two asterisks declare a pointer to a pointer.')
        ],
        practice: ['Print the value through two levels of indirection.', 'Trace each address in a pointer chain.']
      },
      {
        id: 'call-by-reference',
        module: 'pointers',
        title: 'Call by Reference',
        description: 'Allow a function to modify caller data.',
        explanation:
          'Call by reference passes addresses. The called function can modify the original variable through dereferencing. Swap is a classic example.',
        codeExample: {
          language: 'c',
          description: 'Swap by reference',
          code: '#include <stdio.h>\nvoid swap(int *x, int *y) { int temp = *x; *x = *y; *y = temp; }\nint main(void) { int a = 3, b = 4; swap(&a, &b); printf("%d %d", a, b); return 0; }',
          output: '4 3'
        },
        challenges: [
          challenge('reference-call', 'slots', 'Call swap with addresses: swap(___a, ___b)', '&a, &b', undefined, 'Passing &a and &b gives swap access to the original variables.')
        ],
        practice: ['Write a function that doubles a value by reference.', 'Explain why call by value cannot modify the caller.']
      }
    ]
  },
  arrays: {
    id: 'arrays',
    title: 'Arrays',
    description: 'Store related values in contiguous memory.',
    completed: false,
    lessons: [
      {
        id: 'array-basics',
        module: 'arrays',
        title: 'Arrays',
        description: 'Store multiple values under one name.',
        explanation:
          'An array stores a fixed number of values of the same type. Array indexing starts at 0. Declare arrays with a size, such as int marks[90].',
        codeExample: {
          language: 'c',
          description: 'Marks array',
          code: '#include <stdio.h>\nint main(void) {\n    int marks[3] = {33, 88, 40};\n    printf("%d", marks[1]);\n    return 0;\n}',
          output: '88'
        },
        challenges: [
          challenge('array-index', 'slots', 'First element of arr: arr[___]', '0', undefined, 'The first array element has index 0.')
        ],
        practice: ['Create an array of ten numbers.', 'Print every element with a loop.']
      },
      {
        id: 'array-memory',
        module: 'arrays',
        title: 'Arrays in Memory',
        description: 'See contiguous storage.',
        explanation:
          'Array elements are stored in contiguous memory. An int array with three elements reserves enough space for three int values, commonly 12 bytes on a 32-bit model.',
        codeExample: {
          language: 'c',
          description: 'Array size',
          code: '#include <stdio.h>\nint main(void) {\n    int arr[3] = {1, 2, 3};\n    printf("%zu\\n", sizeof(arr));\n    return 0;\n}',
          output: '12'
        },
        challenges: [
          challenge('array-size', 'multiple-choice', 'How many bytes does int arr[3] reserve on a 32-bit model?', ['4', '8', '12'], '12', 'Three integers × four bytes each equals 12 bytes.')
        ],
        practice: ['Print sizeof an array.', 'Draw the memory layout of a small array.']
      },
      {
        id: 'pointer-arithmetic',
        module: 'arrays',
        title: 'Pointer Arithmetic',
        description: 'Traverse an array through pointers.',
        explanation:
          'Pointer arithmetic moves by whole elements, not raw bytes. If ptr points to arr[0], ptr + 2 points to arr[2], and *(ptr + 2) reads that element.',
        codeExample: {
          language: 'c',
          description: 'Pointer traversal',
          code: '#include <stdio.h>\nint main(void) {\n    int arr[3] = {1, 2, 3};\n    int *ptr = arr;\n    printf("%d", *(ptr + 2));\n    return 0;\n}',
          output: '3'
        },
        challenges: [
          challenge('ptr-plus', 'slots', 'Third element through ptr: *(ptr ___ 2)', '+', undefined, 'Adding 2 moves two elements forward from the first element.')
        ],
        practice: ['Verify (ptr + 2) points to the third element.', 'Print an array using pointer arithmetic.']
      },
      {
        id: 'multidimensional',
        module: 'arrays',
        title: '2-D Arrays',
        description: 'Represent rows and columns.',
        explanation:
          'A two-dimensional array is an array of arrays. Access elements with arr[row][col]. Elements are stored row by row in contiguous memory.',
        codeExample: {
          language: 'c',
          description: 'A matrix',
          code: '#include <stdio.h>\nint main(void) {\n    int a[2][2] = {{1, 4}, {7, 9}};\n    printf("%d", a[1][0]);\n    return 0;\n}',
          output: '7'
        },
        challenges: [
          challenge('matrix-index', 'slots', 'Element in row 1, column 0: a[___][___]', '1, 0', undefined, 'Use row then column indices.')
        ],
        practice: ['Create a 3 × 10 multiplication table.', 'Read and print a 2-D array.']
      }
    ]
  },
  strings: {
    id: 'strings',
    title: 'Strings',
    description: 'Work with character arrays and standard string functions.',
    completed: false,
    lessons: [
      {
        id: 'string-basics',
        module: 'strings',
        title: 'Strings',
        description: 'A character array ending in \\0.',
        explanation:
          'A C string is a one-dimensional character array terminated by a null character, '\\0'. Double quotes add the terminator automatically.',
        codeExample: {
          language: 'c',
          description: 'A string literal',
          code: '#include <stdio.h>\nint main(void) {\n    char st[] = "HARRY";\n    printf("%s", st);\n    return 0;\n}',
          output: 'HARRY'
        },
        challenges: [
          challenge('string-terminator', 'slots', 'A string ends with the character ___.', '\\0', undefined, 'The null character marks the end of a C string.')
        ],
        practice: ['Print a string character by character.', 'Create a string with double quotes.']
      },
      {
        id: 'string-input',
        module: 'strings',
        title: 'String Input',
        description: 'Read single words and full lines.',
        explanation:
          'scanf("%s") reads a single word and adds the null terminator. It cannot read a full multi-word line. gets() can read a line, but modern code should prefer fgets() for safer bounded input.',
        codeExample: {
          language: 'c',
          description: 'Reading text',
          code: '#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char st[30];\n    fgets(st, sizeof st, stdin);\n    printf("%s", st);\n    return 0;\n}',
          output: 'Hello world'
        },
        challenges: [
          challenge('scanf-string', 'multiple-choice', 'Which format reads a single word?', ['%s', '%c', '%d'], '%s', 'With scanf, %s reads a non-whitespace sequence.')
        ],
        practice: ['Read a name with scanf.', 'Read a full line with fgets and remove the newline.']
      },
      {
        id: 'string-functions',
        module: 'strings',
        title: 'String Functions',
        description: 'Measure, copy, join, and compare.',
        explanation:
          'The <string.h> library provides strlen, strcpy, strcat, and strcmp. Ensure destination buffers are large enough before copying or concatenating.',
        codeExample: {
          language: 'c',
          description: 'String operations',
          code: '#include <stdio.h>\n#include <string.h>\nint main(void) {\n    char a[12] = "hello";\n    strcat(a, "harry");\n    printf("%s %zu", a, strlen(a));\n    return 0;\n}',
          output: 'helloharry 10'
        },
        challenges: [
          challenge('strlen', 'slots', 'Function that counts characters excluding \\0: ___()', 'strlen', undefined, 'strlen returns the number of visible characters in a string.')
        ],
        practice: ['Write your own strlen.', 'Compare two strings with strcmp.']
      },
      {
        id: 'pointer-strings',
        module: 'strings',
        title: 'Strings with Pointers',
        description: 'Understand string literals and reassignment.',
        explanation:
          'A pointer can point to a string literal, such as char *ptr = "harry". An array initialized with a literal can be modified, while a pointer to a literal should not be modified; the pointer itself can be reassigned.',
        codeExample: {
          language: 'c',
          description: 'Pointer string',
          code: '#include <stdio.h>\nint main(void) {\n    char *ptr = "harry";\n    printf("%s", ptr);\n    ptr = "Rohan";\n    printf(" %s", ptr);\n    return 0;\n}',
          output: 'harry Rohan'
        },
        challenges: [
          challenge('pointer-string', 'slots', 'Assign a new string literal to ptr: ptr = ___;', '"Rohan"', undefined, 'The pointer variable can be reassigned to another string literal.')
        ],
        practice: ['Compare an array string and pointer string.', 'Explain why modifying a string literal is unsafe.']
      }
    ]
  },
  structures: {
    id: 'structures',
    title: 'Structures',
    description: 'Group related values of different types.',
    completed: false,
    lessons: [
      {
        id: 'struct-basics',
        module: 'structures',
        title: 'Structures',
        description: 'Create a named collection of fields.',
        explanation:
          'A structure groups variables of different types under one name. Fields are accessed with the dot operator from a structure variable.',
        codeExample: {
          language: 'c',
          description: 'Employee record',
          code: '#include <stdio.h>\nstruct employee { int code; float salary; char name[10]; };\nint main(void) {\n    struct employee e1 = {100, 71.22, "harry"};\n    printf("%d %.2f", e1.code, e1.salary);\n    return 0;\n}',
          output: '100 71.22'
        },
        challenges: [
          challenge('struct-field', 'slots', 'Access e1.code using the dot operator: e1 ___ code', '.', undefined, 'The dot operator selects a member from a structure value.')
        ],
        practice: ['Create a date structure.', 'Create a bank account structure.']
      },
      {
        id: 'array-structures',
        module: 'structures',
        title: 'Array of Structures',
        description: 'Store many records of one type.',
        explanation:
          'An array can hold many structure values. Access a field with array[row].field, just as you would with a single structure.',
        codeExample: {
          language: 'c',
          description: 'Employee records',
          code: '#include <stdio.h>\nstruct employee { int code; float salary; };\nint main(void) {\n    struct employee records[2] = {{100, 71.22}, {101, 80.0}};\n    printf("%d", records[1].code);\n    return 0;\n}',
          output: '101'
        },
        challenges: [
          challenge('struct-array', 'slots', 'Access salary of records[2]: records[2].___', 'salary', undefined, 'Use the dot operator after selecting the array element.')
        ],
        practice: ['Store three employees in an array.', 'Print all records with a loop.']
      },
      {
        id: 'pointer-structures',
        module: 'structures',
        title: 'Pointer to Structures',
        description: 'Use the arrow operator.',
        explanation:
          'A pointer can point to a structure. Use *ptr.field to dereference and select a member, or the cleaner arrow operator ptr->field.',
        codeExample: {
          language: 'c',
          description: 'Arrow operator',
          code: '#include <stdio.h>\nstruct employee { int code; };\nint main(void) {\n    struct employee e1 = {100};\n    struct employee *ptr = &e1;\n    printf("%d", ptr->code);\n    return 0;\n}',
          output: '100'
        },
        challenges: [
          challenge('arrow', 'slots', 'Access code through pointer ptr: ptr ___ code', '->', undefined, 'The arrow operator combines dereferencing and field selection.')
        ],
        practice: ['Rewrite a dot-operator example using ->.', 'Pass a structure pointer to a function.']
      },
      {
        id: 'typedef',
        module: 'structures',
        title: 'typedef Keyword',
        description: 'Create a clearer type alias.',
        explanation:
          'typedef creates an alias for an existing type. It is commonly used to make struct declarations shorter and easier to read.',
        codeExample: {
          language: 'c',
          description: 'A type alias',
          code: '#include <stdio.h>\ntypedef struct Complex { float real; float img; } ComplexNo;\nint main(void) { ComplexNo c1 = {1.0, 2.0}; printf("%.1f", c1.real); return 0; }',
          output: '1.0'
        },
        challenges: [
          challenge('typedef', 'slots', 'Keyword that creates a type alias: ___', 'typedef', undefined, 'typedef gives an existing type a new name.')
        ],
        practice: ['Create a ComplexNo alias.', 'Use typedef for a date type.']
      }
    ]
  },
  files: {
    id: 'files',
    title: 'File Input / Output',
    description: 'Persist data in text and binary files.',
    completed: false,
    lessons: [
      {
        id: 'file-opening',
        module: 'files',
        title: 'Opening Files',
        description: 'Choose a mode for reading or writing.',
        explanation:
          'A FILE pointer communicates with a file. fopen opens a file with a mode such as r for reading, w for writing, or a for appending. Always check whether the file opened successfully.',
        codeExample: {
          language: 'c',
          description: 'Open a file',
          code: '#include <stdio.h>\nint main(void) {\n    FILE *ptr = fopen("harry.txt", "r");\n    if (ptr == NULL) return 1;\n    fclose(ptr);\n    return 0;\n}',
          output: ''
        },
        challenges: [
          challenge('file-mode', 'slots', 'Mode for writing a new file: fopen("x", "___")', 'w', undefined, 'The w mode opens a file for writing and creates it if needed.')
        ],
        practice: ['Open a file for reading.', 'Handle a missing file before reading.']
      },
      {
        id: 'fscanf-fprintf',
        module: 'files',
        title: 'Formatted File I/O',
        description: 'Read and write values with format strings.',
        explanation:
          'fscanf reads formatted values from a file, and fprintf writes formatted values to a file. Pass the address of a variable when reading into it.',
        codeExample: {
          language: 'c',
          description: 'Read an integer',
          code: '#include <stdio.h>\nint main(void) {\n    FILE *ptr = fopen("harry.txt", "r");\n    int num = 0;\n    fscanf(ptr, "%d", &num);\n    printf("%d", num);\n    fclose(ptr);\n    return 0;\n}',
          output: '432'
        },
        challenges: [
          challenge('fscanf-address', 'slots', 'Pass the address of num: fscanf(ptr, "%d", ___num)', '&', undefined, 'fscanf needs the address where it should store the value.')
        ],
        practice: ['Read three integers from a file.', 'Write a formatted multiplication table.']
      },
      {
        id: 'fgetc-fputc',
        module: 'files',
        title: 'Character File I/O',
        description: 'Copy and transform files character by character.',
        explanation:
          'fgetc reads one character and returns EOF at end of file. fputc writes one character. These functions are useful for text processing and file copying.',
        codeExample: {
          language: 'c',
          description: 'Read until EOF',
          code: '#include <stdio.h>\nint main(void) {\n    FILE *ptr = fopen("input.txt", "r");\n    int ch = fgetc(ptr);\n    while (ch != EOF) { fputc(ch, stdout); ch = fgetc(ptr); }\n    fclose(ptr);\n    return 0;\n}',
          output: 'text'
        },
        challenges: [
          challenge('eof', 'slots', 'Constant returned at end of file: ___', 'EOF', undefined, 'EOF signals that no more characters can be read.')
        ],
        practice: ['Copy a text file character by character.', 'Count characters in a file.']
      },
      {
        id: 'closing-files',
        module: 'files',
        title: 'Closing Files',
        description: 'Release file resources.',
        explanation:
          'fclose tells the runtime that work with a file is complete and releases associated resources. Close files after both reading and writing.',
        codeExample: {
          language: 'c',
          description: 'Close after writing',
          code: '#include <stdio.h>\nint main(void) {\n    FILE *fptr = fopen("out.txt", "w");\n    fprintf(fptr, "%d", 432);\n    fclose(fptr);\n    return 0;\n}',
          output: ''
        },
        challenges: [
          challenge('fclose', 'slots', 'Function used to close a file: ___(ptr)', 'fclose', undefined, 'fclose releases resources associated with a FILE pointer.')
        ],
        practice: ['Close every file in a program.', 'Explain why an unclosed file can lose data.']
      }
    ]
  },
  memory: {
    id: 'memory',
    title: 'Dynamic Memory Allocation',
    description: 'Allocate and resize memory while a program runs.',
    completed: false,
    lessons: [
      {
        id: 'malloc',
        module: 'memory',
        title: 'malloc()',
        description: 'Allocate a block of memory at runtime.',
        explanation:
          'malloc takes the number of bytes to allocate and returns a void pointer. Cast it to the desired type, check for NULL, and free the block when finished.',
        codeExample: {
          language: 'c',
          description: 'Dynamic integer array',
          code: '#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *arr = (int *)malloc(5 * sizeof(int));\n    if (arr == NULL) return 1;\n    arr[0] = 10;\n    printf("%d", arr[0]);\n    free(arr);\n    return 0;\n}',
          output: '10'
        },
        challenges: [
          challenge('malloc-size', 'slots', 'Allocate five ints: malloc(5 * sizeof(___))', 'int', undefined, 'sizeof(int) gives the storage needed for one integer.')
        ],
        practice: ['Create a dynamic array of five floats.', 'Check malloc for NULL.']
      },
      {
        id: 'calloc',
        module: 'memory',
        title: 'calloc()',
        description: 'Allocate zero-filled memory.',
        explanation:
          'calloc takes the number of elements and the size of each element. It allocates memory and initializes it to zero, returning NULL if allocation fails.',
        codeExample: {
          language: 'c',
          description: 'Zero-filled array',
          code: '#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *arr = (int *)calloc(5, sizeof(int));\n    if (arr == NULL) return 1;\n    printf("%d", arr[0]);\n    free(arr);\n    return 0;\n}',
          output: '0'
        },
        challenges: [
          challenge('calloc-args', 'slots', 'Allocate n ints with calloc: calloc(n, sizeof(___))', 'int', undefined, 'calloc receives element count and element size.')
        ],
        practice: ['Create a zero-filled array of size n.', 'Print the first element.']
      },
      {
        id: 'free',
        module: 'memory',
        title: 'free()',
        description: 'Release allocated memory.',
        explanation:
          'free releases memory allocated by malloc or calloc. Never use a pointer after free(), and do not call free twice on the same block.',
        codeExample: {
          language: 'c',
          description: 'Release memory',
          code: '#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *ptr = (int *)malloc(3 * sizeof(int));\n    free(ptr);\n    return 0;\n}',
          output: ''
        },
        challenges: [
          challenge('free', 'slots', 'Function that deallocates memory: ___(ptr)', 'free', undefined, 'free returns an allocated block to the system.')
        ],
        practice: ['Free a dynamic array after use.', 'Explain why double free is dangerous.']
      },
      {
        id: 'realloc',
        module: 'memory',
        title: 'realloc()',
        description: 'Resize an allocated block.',
        explanation:
          'realloc changes the size of a previously allocated block. It may move the block, so update the pointer with the returned value. Check for NULL before continuing.',
        codeExample: {
          language: 'c',
          description: 'Resize array',
          code: '#include <stdio.h>\n#include <stdlib.h>\nint main(void) {\n    int *ptr = (int *)malloc(2 * sizeof(int));\n    ptr = (int *)realloc(ptr, 3 * sizeof(int));\n    if (ptr == NULL) return 1;\n    ptr[2] = 7;\n    free(ptr);\n    return 0;\n}',
          output: ''
        },
        challenges: [
          challenge('realloc', 'slots', 'Resize ptr to three ints: realloc(ptr, 3 * sizeof(___))', 'int', undefined, 'realloc keeps the existing allocation and requests a new size.')
        ],
        practice: ['Grow an array from 5 to 10 elements.', 'Handle a failed realloc safely.']
      }
    ]
  }
}

export const moduleOrder = [
  'foundations',
  'operators',
  'conditionals',
  'loops',
  'functions',
  'pointers',
  'arrays',
  'strings',
  'structures',
  'files',
  'memory'
]

export const moduleMeta: Record<string, { label: string; color: string; icon: string }> = {
  foundations: { label: 'FOUNDATIONS', color: '#FF5A00', icon: '01' },
  operators: { label: 'OPERATORS', color: '#F2F2F2', icon: '02' },
  conditionals: { label: 'CONDITIONALS', color: '#FF5A00', icon: '03' },
  loops: { label: 'LOOPS', color: '#B8B8B8', icon: '04' },
  functions: { label: 'FUNCTIONS', color: '#FF5A00', icon: '05' },
  pointers: { label: 'MEMORY / POINTERS', color: '#F2F2F2', icon: '06' },
  arrays: { label: 'DATA / ARRAYS', color: '#B8B8B8', icon: '07' },
  strings: { label: 'DATA / STRINGS', color: '#FF5A00', icon: '08' },
  structures: { label: 'DATA / STRUCTURES', color: '#B8B8B8', icon: '09' },
  files: { label: 'SYSTEMS / FILES', color: '#F2F2F2', icon: '10' },
  memory: { label: 'SYSTEMS / MEMORY', color: '#FF5A00', icon: '11' }
}

export const allLessons = moduleOrder.flatMap((moduleId) => curriculum[moduleId].lessons)

export const lessonById = (id: string) => allLessons.find((lesson) => lesson.id === id) ?? allLessons[0]
