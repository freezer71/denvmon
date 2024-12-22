# Denvmon

**Denvmon** is a powerful utility for parsing environment variables using a class model structure. It leverages TypeScript decorators to define and validate environment variables based on their types.

## Features

- Support for environment variables of type `STRING`, `NUMBER`, and `BOOLEAN`.
- Configurable properties such as `defaultValue`, `required`, and validation rules like `min`, `max`, or allowed values.
- Uses TypeScript decorators for clean and declarative configuration.

## Installation

Install the package using npm or yarn:

```bash
npm install denvmon
```
### `tsconfig.json`
```ts
{
    "compilerOptions": {
      "experimentalDecorators": true,
    },
}
```

## Usage

### Step 1: Define Your `.env` File

Create a `.env` file in the root of your project with the following contents:

```env
TIMEOUT=3000
IS_PRODUCTION=false
APP_NAME=MyApp
DATABASE_URI=test
DURATION=4.5
```

### Step 2: Import the Required Modules

```typescript
import { Denvmon, IsString, IsNumber, IsBoolean } from "denvmon";
```

### Step 3: Define Your Class Model

Define your environment variables using the provided decorators:

```typescript
import { Denvmon, IsBoolean, IsNumber, IsString } from "denvmon";

@Denvmon()
class Config {
  @IsString("DATABASE_URI")
  DATABASE_URI!: string;

  @IsNumber("TIMEOUT", {
    isInt: true,
  })
  timeout!: number;

  @IsNumber("TIMEOUT")
  sleep!: number;

  @IsBoolean("IS_PRODUCTION")
  is_production!: boolean;

  @IsNumber("DURATION")
  duration!: number;

  @IsBoolean("CUSTOM_BOOLEAN", {
    types: ["yes", "no"],
  })
  custom_boolean!: boolean;
}

const config = new Config();
console.log(config);
```

### Example Output

When you run the above code with the `.env` file provided, you will get the following output:

```javascript
{
  DATABASE_URI: "test",
  timeout: 3000,
  sleep: 3000,
  is_production: false,
  duration: 4.5,
  custom_boolean: false
}
```

### API Reference

#### `@IsString`

Defines a string environment variable.

```typescript
@IsString(key: string, {
  defaultValue?: string;
  required?: boolean;
  max?: number;
  min?: number;
})
```

- **`key`**: The name of the environment variable.
- **`defaultValue`**: The default value if the variable is not set.
- **`required`**: Whether the variable is required (default: `true`).
- **`max`**: Maximum string length.
- **`min`**: Minimum string length.

#### `@IsNumber`

Defines a number environment variable.

```typescript
@IsNumber(key: string, {
  defaultValue?: number;
  required?: boolean;
  isInt?: boolean;
})
```

- **`key`**: The name of the environment variable.
- **`defaultValue`**: The default value if the variable is not set. Supports integers and floats.
- **`required`**: Whether the variable is required (default: `true`).
- **`isInt`**: Whether the number must be an integer.

#### `@IsBoolean`

Defines a boolean environment variable.

```typescript
@IsBoolean(key: string, {
  defaultValue?: boolean;
  required?: boolean;
  types?: [string, string];
})
```

- **`key`**: The name of the environment variable.
- **`defaultValue`**: The default value if the variable is not set.
- **`required`**: Whether the variable is required (default: `true`).
- **`types`**: The string representation of `true` and `false` values.

#### Custom Boolean Types Example

You can define custom string representations for boolean values using the `types` option:

```typescript
@IsBoolean("CUSTOM_BOOLEAN", {
  types: ["yes", "no"],
})
custom_boolean!: boolean;
```

In the `.env` file, you can use:

```env
CUSTOM_BOOLEAN=yes
```

The `custom_boolean` property in the class will then be set to `true` if the value is "yes" or `false` if the value is "no".
