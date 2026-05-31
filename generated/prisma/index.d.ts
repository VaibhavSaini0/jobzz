
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model company
 * 
 */
export type company = $Result.DefaultSelection<Prisma.$companyPayload>
/**
 * Model job
 * 
 */
export type job = $Result.DefaultSelection<Prisma.$jobPayload>
/**
 * Model review
 * 
 */
export type review = $Result.DefaultSelection<Prisma.$reviewPayload>
/**
 * Model Applications
 * 
 */
export type Applications = $Result.DefaultSelection<Prisma.$ApplicationsPayload>
/**
 * Model Resume
 * 
 */
export type Resume = $Result.DefaultSelection<Prisma.$ResumePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.company`: Exposes CRUD operations for the **company** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.company.findMany()
    * ```
    */
  get company(): Prisma.companyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.job`: Exposes CRUD operations for the **job** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Jobs
    * const jobs = await prisma.job.findMany()
    * ```
    */
  get job(): Prisma.jobDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.reviewDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.applications`: Exposes CRUD operations for the **Applications** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Applications
    * const applications = await prisma.applications.findMany()
    * ```
    */
  get applications(): Prisma.ApplicationsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.resume`: Exposes CRUD operations for the **Resume** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Resumes
    * const resumes = await prisma.resume.findMany()
    * ```
    */
  get resume(): Prisma.ResumeDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.13.0
   * Query Engine version: 361e86d0ea4987e9f53a565309b3eed797a6bcbd
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    user: 'user',
    company: 'company',
    job: 'job',
    review: 'review',
    Applications: 'Applications',
    Resume: 'Resume'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "company" | "job" | "review" | "applications" | "resume"
      txIsolationLevel: never
    }
    model: {
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.userFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.userAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      company: {
        payload: Prisma.$companyPayload<ExtArgs>
        fields: Prisma.companyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.companyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.companyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          findFirst: {
            args: Prisma.companyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.companyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          findMany: {
            args: Prisma.companyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>[]
          }
          create: {
            args: Prisma.companyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          createMany: {
            args: Prisma.companyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.companyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          update: {
            args: Prisma.companyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          deleteMany: {
            args: Prisma.companyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.companyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.companyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$companyPayload>
          }
          aggregate: {
            args: Prisma.CompanyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCompany>
          }
          groupBy: {
            args: Prisma.companyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CompanyGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.companyFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.companyAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.companyCountArgs<ExtArgs>
            result: $Utils.Optional<CompanyCountAggregateOutputType> | number
          }
        }
      }
      job: {
        payload: Prisma.$jobPayload<ExtArgs>
        fields: Prisma.jobFieldRefs
        operations: {
          findUnique: {
            args: Prisma.jobFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.jobFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          findFirst: {
            args: Prisma.jobFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.jobFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          findMany: {
            args: Prisma.jobFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>[]
          }
          create: {
            args: Prisma.jobCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          createMany: {
            args: Prisma.jobCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.jobDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          update: {
            args: Prisma.jobUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          deleteMany: {
            args: Prisma.jobDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.jobUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.jobUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$jobPayload>
          }
          aggregate: {
            args: Prisma.JobAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJob>
          }
          groupBy: {
            args: Prisma.jobGroupByArgs<ExtArgs>
            result: $Utils.Optional<JobGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.jobFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.jobAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.jobCountArgs<ExtArgs>
            result: $Utils.Optional<JobCountAggregateOutputType> | number
          }
        }
      }
      review: {
        payload: Prisma.$reviewPayload<ExtArgs>
        fields: Prisma.reviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.reviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findFirst: {
            args: Prisma.reviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          findMany: {
            args: Prisma.reviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>[]
          }
          create: {
            args: Prisma.reviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          createMany: {
            args: Prisma.reviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.reviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          update: {
            args: Prisma.reviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          deleteMany: {
            args: Prisma.reviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.reviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.reviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$reviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.reviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.reviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.reviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.reviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      Applications: {
        payload: Prisma.$ApplicationsPayload<ExtArgs>
        fields: Prisma.ApplicationsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ApplicationsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ApplicationsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          findFirst: {
            args: Prisma.ApplicationsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ApplicationsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          findMany: {
            args: Prisma.ApplicationsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>[]
          }
          create: {
            args: Prisma.ApplicationsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          createMany: {
            args: Prisma.ApplicationsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ApplicationsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          update: {
            args: Prisma.ApplicationsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          deleteMany: {
            args: Prisma.ApplicationsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ApplicationsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ApplicationsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ApplicationsPayload>
          }
          aggregate: {
            args: Prisma.ApplicationsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateApplications>
          }
          groupBy: {
            args: Prisma.ApplicationsGroupByArgs<ExtArgs>
            result: $Utils.Optional<ApplicationsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ApplicationsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ApplicationsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ApplicationsCountArgs<ExtArgs>
            result: $Utils.Optional<ApplicationsCountAggregateOutputType> | number
          }
        }
      }
      Resume: {
        payload: Prisma.$ResumePayload<ExtArgs>
        fields: Prisma.ResumeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResumeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResumeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findFirst: {
            args: Prisma.ResumeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResumeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          findMany: {
            args: Prisma.ResumeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>[]
          }
          create: {
            args: Prisma.ResumeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          createMany: {
            args: Prisma.ResumeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResumeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          update: {
            args: Prisma.ResumeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          deleteMany: {
            args: Prisma.ResumeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResumeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResumeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResumePayload>
          }
          aggregate: {
            args: Prisma.ResumeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResume>
          }
          groupBy: {
            args: Prisma.ResumeGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResumeGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ResumeFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ResumeAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ResumeCountArgs<ExtArgs>
            result: $Utils.Optional<ResumeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: userOmit
    company?: companyOmit
    job?: jobOmit
    review?: reviewOmit
    applications?: ApplicationsOmit
    resume?: ResumeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    review: number
    applied_jobs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    review?: boolean | UserCountOutputTypeCountReviewArgs
    applied_jobs?: boolean | UserCountOutputTypeCountApplied_jobsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountApplied_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationsWhereInput
  }


  /**
   * Count Type CompanyCountOutputType
   */

  export type CompanyCountOutputType = {
    jobs: number
    review: number
  }

  export type CompanyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | CompanyCountOutputTypeCountJobsArgs
    review?: boolean | CompanyCountOutputTypeCountReviewArgs
  }

  // Custom InputTypes
  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompanyCountOutputType
     */
    select?: CompanyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountJobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: jobWhereInput
  }

  /**
   * CompanyCountOutputType without action
   */
  export type CompanyCountOutputTypeCountReviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
  }


  /**
   * Count Type JobCountOutputType
   */

  export type JobCountOutputType = {
    applications: number
  }

  export type JobCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | JobCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JobCountOutputType
     */
    select?: JobCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JobCountOutputType without action
   */
  export type JobCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationsWhereInput
  }


  /**
   * Count Type ResumeCountOutputType
   */

  export type ResumeCountOutputType = {
    applications: number
  }

  export type ResumeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    applications?: boolean | ResumeCountOutputTypeCountApplicationsArgs
  }

  // Custom InputTypes
  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ResumeCountOutputType
     */
    select?: ResumeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ResumeCountOutputType without action
   */
  export type ResumeCountOutputTypeCountApplicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    role: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    review?: boolean | user$reviewArgs<ExtArgs>
    applied_jobs?: boolean | user$applied_jobsArgs<ExtArgs>
    Resume?: boolean | user$ResumeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    review?: boolean | user$reviewArgs<ExtArgs>
    applied_jobs?: boolean | user$applied_jobsArgs<ExtArgs>
    Resume?: boolean | user$ResumeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      review: Prisma.$reviewPayload<ExtArgs>[]
      applied_jobs: Prisma.$ApplicationsPayload<ExtArgs>[]
      Resume: Prisma.$ResumePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * @param {userFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: userFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {userAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: userAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    review<T extends user$reviewArgs<ExtArgs> = {}>(args?: Subset<T, user$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    applied_jobs<T extends user$applied_jobsArgs<ExtArgs> = {}>(args?: Subset<T, user$applied_jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Resume<T extends user$ResumeArgs<ExtArgs> = {}>(args?: Subset<T, user$ResumeArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly password: FieldRef<"user", 'String'>
    readonly role: FieldRef<"user", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user findRaw
   */
  export type userFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * user aggregateRaw
   */
  export type userAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * user.review
   */
  export type user$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * user.applied_jobs
   */
  export type user$applied_jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    where?: ApplicationsWhereInput
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    cursor?: ApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * user.Resume
   */
  export type user$ResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model company
   */

  export type AggregateCompany = {
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  export type CompanyMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
  }

  export type CompanyMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    ownerId: string | null
  }

  export type CompanyCountAggregateOutputType = {
    id: number
    name: number
    description: number
    ownerId: number
    _all: number
  }


  export type CompanyMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
  }

  export type CompanyMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
  }

  export type CompanyCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    ownerId?: true
    _all?: true
  }

  export type CompanyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which company to aggregate.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned companies
    **/
    _count?: true | CompanyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompanyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompanyMaxAggregateInputType
  }

  export type GetCompanyAggregateType<T extends CompanyAggregateArgs> = {
        [P in keyof T & keyof AggregateCompany]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompany[P]>
      : GetScalarType<T[P], AggregateCompany[P]>
  }




  export type companyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: companyWhereInput
    orderBy?: companyOrderByWithAggregationInput | companyOrderByWithAggregationInput[]
    by: CompanyScalarFieldEnum[] | CompanyScalarFieldEnum
    having?: companyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompanyCountAggregateInputType | true
    _min?: CompanyMinAggregateInputType
    _max?: CompanyMaxAggregateInputType
  }

  export type CompanyGroupByOutputType = {
    id: string
    name: string
    description: string
    ownerId: string
    _count: CompanyCountAggregateOutputType | null
    _min: CompanyMinAggregateOutputType | null
    _max: CompanyMaxAggregateOutputType | null
  }

  type GetCompanyGroupByPayload<T extends companyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompanyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompanyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompanyGroupByOutputType[P]>
            : GetScalarType<T[P], CompanyGroupByOutputType[P]>
        }
      >
    >


  export type companySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
    jobs?: boolean | company$jobsArgs<ExtArgs>
    review?: boolean | company$reviewArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["company"]>



  export type companySelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    ownerId?: boolean
  }

  export type companyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "ownerId", ExtArgs["result"]["company"]>
  export type companyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jobs?: boolean | company$jobsArgs<ExtArgs>
    review?: boolean | company$reviewArgs<ExtArgs>
    _count?: boolean | CompanyCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $companyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "company"
    objects: {
      jobs: Prisma.$jobPayload<ExtArgs>[]
      review: Prisma.$reviewPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      ownerId: string
    }, ExtArgs["result"]["company"]>
    composites: {}
  }

  type companyGetPayload<S extends boolean | null | undefined | companyDefaultArgs> = $Result.GetResult<Prisma.$companyPayload, S>

  type companyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<companyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CompanyCountAggregateInputType | true
    }

  export interface companyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['company'], meta: { name: 'company' } }
    /**
     * Find zero or one Company that matches the filter.
     * @param {companyFindUniqueArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends companyFindUniqueArgs>(args: SelectSubset<T, companyFindUniqueArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Company that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {companyFindUniqueOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends companyFindUniqueOrThrowArgs>(args: SelectSubset<T, companyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindFirstArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends companyFindFirstArgs>(args?: SelectSubset<T, companyFindFirstArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Company that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindFirstOrThrowArgs} args - Arguments to find a Company
     * @example
     * // Get one Company
     * const company = await prisma.company.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends companyFindFirstOrThrowArgs>(args?: SelectSubset<T, companyFindFirstOrThrowArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.company.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.company.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companyWithIdOnly = await prisma.company.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends companyFindManyArgs>(args?: SelectSubset<T, companyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Company.
     * @param {companyCreateArgs} args - Arguments to create a Company.
     * @example
     * // Create one Company
     * const Company = await prisma.company.create({
     *   data: {
     *     // ... data to create a Company
     *   }
     * })
     * 
     */
    create<T extends companyCreateArgs>(args: SelectSubset<T, companyCreateArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Companies.
     * @param {companyCreateManyArgs} args - Arguments to create many Companies.
     * @example
     * // Create many Companies
     * const company = await prisma.company.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends companyCreateManyArgs>(args?: SelectSubset<T, companyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Company.
     * @param {companyDeleteArgs} args - Arguments to delete one Company.
     * @example
     * // Delete one Company
     * const Company = await prisma.company.delete({
     *   where: {
     *     // ... filter to delete one Company
     *   }
     * })
     * 
     */
    delete<T extends companyDeleteArgs>(args: SelectSubset<T, companyDeleteArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Company.
     * @param {companyUpdateArgs} args - Arguments to update one Company.
     * @example
     * // Update one Company
     * const company = await prisma.company.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends companyUpdateArgs>(args: SelectSubset<T, companyUpdateArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Companies.
     * @param {companyDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.company.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends companyDeleteManyArgs>(args?: SelectSubset<T, companyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const company = await prisma.company.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends companyUpdateManyArgs>(args: SelectSubset<T, companyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Company.
     * @param {companyUpsertArgs} args - Arguments to update or create a Company.
     * @example
     * // Update or create a Company
     * const company = await prisma.company.upsert({
     *   create: {
     *     // ... data to create a Company
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Company we want to update
     *   }
     * })
     */
    upsert<T extends companyUpsertArgs>(args: SelectSubset<T, companyUpsertArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Companies that matches the filter.
     * @param {companyFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const company = await prisma.company.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: companyFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Company.
     * @param {companyAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const company = await prisma.company.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: companyAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.company.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends companyCountArgs>(
      args?: Subset<T, companyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompanyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompanyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompanyAggregateArgs>(args: Subset<T, CompanyAggregateArgs>): Prisma.PrismaPromise<GetCompanyAggregateType<T>>

    /**
     * Group by Company.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {companyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends companyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: companyGroupByArgs['orderBy'] }
        : { orderBy?: companyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, companyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompanyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the company model
   */
  readonly fields: companyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for company.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__companyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    jobs<T extends company$jobsArgs<ExtArgs> = {}>(args?: Subset<T, company$jobsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    review<T extends company$reviewArgs<ExtArgs> = {}>(args?: Subset<T, company$reviewArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the company model
   */
  interface companyFieldRefs {
    readonly id: FieldRef<"company", 'String'>
    readonly name: FieldRef<"company", 'String'>
    readonly description: FieldRef<"company", 'String'>
    readonly ownerId: FieldRef<"company", 'String'>
  }
    

  // Custom InputTypes
  /**
   * company findUnique
   */
  export type companyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company findUniqueOrThrow
   */
  export type companyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company findFirst
   */
  export type companyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company findFirstOrThrow
   */
  export type companyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which company to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of companies.
     */
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company findMany
   */
  export type companyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter, which companies to fetch.
     */
    where?: companyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of companies to fetch.
     */
    orderBy?: companyOrderByWithRelationInput | companyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing companies.
     */
    cursor?: companyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` companies.
     */
    skip?: number
    distinct?: CompanyScalarFieldEnum | CompanyScalarFieldEnum[]
  }

  /**
   * company create
   */
  export type companyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The data needed to create a company.
     */
    data: XOR<companyCreateInput, companyUncheckedCreateInput>
  }

  /**
   * company createMany
   */
  export type companyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many companies.
     */
    data: companyCreateManyInput | companyCreateManyInput[]
  }

  /**
   * company update
   */
  export type companyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The data needed to update a company.
     */
    data: XOR<companyUpdateInput, companyUncheckedUpdateInput>
    /**
     * Choose, which company to update.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company updateMany
   */
  export type companyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update companies.
     */
    data: XOR<companyUpdateManyMutationInput, companyUncheckedUpdateManyInput>
    /**
     * Filter which companies to update
     */
    where?: companyWhereInput
    /**
     * Limit how many companies to update.
     */
    limit?: number
  }

  /**
   * company upsert
   */
  export type companyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * The filter to search for the company to update in case it exists.
     */
    where: companyWhereUniqueInput
    /**
     * In case the company found by the `where` argument doesn't exist, create a new company with this data.
     */
    create: XOR<companyCreateInput, companyUncheckedCreateInput>
    /**
     * In case the company was found with the provided `where` argument, update it with this data.
     */
    update: XOR<companyUpdateInput, companyUncheckedUpdateInput>
  }

  /**
   * company delete
   */
  export type companyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
    /**
     * Filter which company to delete.
     */
    where: companyWhereUniqueInput
  }

  /**
   * company deleteMany
   */
  export type companyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which companies to delete
     */
    where?: companyWhereInput
    /**
     * Limit how many companies to delete.
     */
    limit?: number
  }

  /**
   * company findRaw
   */
  export type companyFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * company aggregateRaw
   */
  export type companyAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * company.jobs
   */
  export type company$jobsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    where?: jobWhereInput
    orderBy?: jobOrderByWithRelationInput | jobOrderByWithRelationInput[]
    cursor?: jobWhereUniqueInput
    take?: number
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * company.review
   */
  export type company$reviewArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    cursor?: reviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * company without action
   */
  export type companyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the company
     */
    select?: companySelect<ExtArgs> | null
    /**
     * Omit specific fields from the company
     */
    omit?: companyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: companyInclude<ExtArgs> | null
  }


  /**
   * Model job
   */

  export type AggregateJob = {
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  export type JobAvgAggregateOutputType = {
    salary: number | null
  }

  export type JobSumAggregateOutputType = {
    salary: number | null
  }

  export type JobMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    location: string | null
    salary: number | null
    employment_type: string | null
    job_type: string | null
    apply_through: string | null
    companyId: string | null
    lastDate: Date | null
  }

  export type JobMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    location: string | null
    salary: number | null
    employment_type: string | null
    job_type: string | null
    apply_through: string | null
    companyId: string | null
    lastDate: Date | null
  }

  export type JobCountAggregateOutputType = {
    id: number
    title: number
    description: number
    location: number
    salary: number
    employment_type: number
    job_type: number
    apply_through: number
    companyId: number
    lastDate: number
    _all: number
  }


  export type JobAvgAggregateInputType = {
    salary?: true
  }

  export type JobSumAggregateInputType = {
    salary?: true
  }

  export type JobMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    salary?: true
    employment_type?: true
    job_type?: true
    apply_through?: true
    companyId?: true
    lastDate?: true
  }

  export type JobMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    salary?: true
    employment_type?: true
    job_type?: true
    apply_through?: true
    companyId?: true
    lastDate?: true
  }

  export type JobCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    location?: true
    salary?: true
    employment_type?: true
    job_type?: true
    apply_through?: true
    companyId?: true
    lastDate?: true
    _all?: true
  }

  export type JobAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which job to aggregate.
     */
    where?: jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jobs to fetch.
     */
    orderBy?: jobOrderByWithRelationInput | jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned jobs
    **/
    _count?: true | JobCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JobAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JobSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JobMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JobMaxAggregateInputType
  }

  export type GetJobAggregateType<T extends JobAggregateArgs> = {
        [P in keyof T & keyof AggregateJob]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJob[P]>
      : GetScalarType<T[P], AggregateJob[P]>
  }




  export type jobGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: jobWhereInput
    orderBy?: jobOrderByWithAggregationInput | jobOrderByWithAggregationInput[]
    by: JobScalarFieldEnum[] | JobScalarFieldEnum
    having?: jobScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JobCountAggregateInputType | true
    _avg?: JobAvgAggregateInputType
    _sum?: JobSumAggregateInputType
    _min?: JobMinAggregateInputType
    _max?: JobMaxAggregateInputType
  }

  export type JobGroupByOutputType = {
    id: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    companyId: string
    lastDate: Date | null
    _count: JobCountAggregateOutputType | null
    _avg: JobAvgAggregateOutputType | null
    _sum: JobSumAggregateOutputType | null
    _min: JobMinAggregateOutputType | null
    _max: JobMaxAggregateOutputType | null
  }

  type GetJobGroupByPayload<T extends jobGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JobGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JobGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JobGroupByOutputType[P]>
            : GetScalarType<T[P], JobGroupByOutputType[P]>
        }
      >
    >


  export type jobSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    salary?: boolean
    employment_type?: boolean
    job_type?: boolean
    apply_through?: boolean
    companyId?: boolean
    lastDate?: boolean
    company?: boolean | companyDefaultArgs<ExtArgs>
    applications?: boolean | job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["job"]>



  export type jobSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    location?: boolean
    salary?: boolean
    employment_type?: boolean
    job_type?: boolean
    apply_through?: boolean
    companyId?: boolean
    lastDate?: boolean
  }

  export type jobOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "location" | "salary" | "employment_type" | "job_type" | "apply_through" | "companyId" | "lastDate", ExtArgs["result"]["job"]>
  export type jobInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    company?: boolean | companyDefaultArgs<ExtArgs>
    applications?: boolean | job$applicationsArgs<ExtArgs>
    _count?: boolean | JobCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $jobPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "job"
    objects: {
      company: Prisma.$companyPayload<ExtArgs>
      applications: Prisma.$ApplicationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      location: string
      salary: number
      employment_type: string
      job_type: string
      apply_through: string
      companyId: string
      lastDate: Date | null
    }, ExtArgs["result"]["job"]>
    composites: {}
  }

  type jobGetPayload<S extends boolean | null | undefined | jobDefaultArgs> = $Result.GetResult<Prisma.$jobPayload, S>

  type jobCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<jobFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: JobCountAggregateInputType | true
    }

  export interface jobDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['job'], meta: { name: 'job' } }
    /**
     * Find zero or one Job that matches the filter.
     * @param {jobFindUniqueArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends jobFindUniqueArgs>(args: SelectSubset<T, jobFindUniqueArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Job that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {jobFindUniqueOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends jobFindUniqueOrThrowArgs>(args: SelectSubset<T, jobFindUniqueOrThrowArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobFindFirstArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends jobFindFirstArgs>(args?: SelectSubset<T, jobFindFirstArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Job that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobFindFirstOrThrowArgs} args - Arguments to find a Job
     * @example
     * // Get one Job
     * const job = await prisma.job.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends jobFindFirstOrThrowArgs>(args?: SelectSubset<T, jobFindFirstOrThrowArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Jobs
     * const jobs = await prisma.job.findMany()
     * 
     * // Get first 10 Jobs
     * const jobs = await prisma.job.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jobWithIdOnly = await prisma.job.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends jobFindManyArgs>(args?: SelectSubset<T, jobFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Job.
     * @param {jobCreateArgs} args - Arguments to create a Job.
     * @example
     * // Create one Job
     * const Job = await prisma.job.create({
     *   data: {
     *     // ... data to create a Job
     *   }
     * })
     * 
     */
    create<T extends jobCreateArgs>(args: SelectSubset<T, jobCreateArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Jobs.
     * @param {jobCreateManyArgs} args - Arguments to create many Jobs.
     * @example
     * // Create many Jobs
     * const job = await prisma.job.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends jobCreateManyArgs>(args?: SelectSubset<T, jobCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Job.
     * @param {jobDeleteArgs} args - Arguments to delete one Job.
     * @example
     * // Delete one Job
     * const Job = await prisma.job.delete({
     *   where: {
     *     // ... filter to delete one Job
     *   }
     * })
     * 
     */
    delete<T extends jobDeleteArgs>(args: SelectSubset<T, jobDeleteArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Job.
     * @param {jobUpdateArgs} args - Arguments to update one Job.
     * @example
     * // Update one Job
     * const job = await prisma.job.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends jobUpdateArgs>(args: SelectSubset<T, jobUpdateArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Jobs.
     * @param {jobDeleteManyArgs} args - Arguments to filter Jobs to delete.
     * @example
     * // Delete a few Jobs
     * const { count } = await prisma.job.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends jobDeleteManyArgs>(args?: SelectSubset<T, jobDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Jobs
     * const job = await prisma.job.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends jobUpdateManyArgs>(args: SelectSubset<T, jobUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Job.
     * @param {jobUpsertArgs} args - Arguments to update or create a Job.
     * @example
     * // Update or create a Job
     * const job = await prisma.job.upsert({
     *   create: {
     *     // ... data to create a Job
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Job we want to update
     *   }
     * })
     */
    upsert<T extends jobUpsertArgs>(args: SelectSubset<T, jobUpsertArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Jobs that matches the filter.
     * @param {jobFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const job = await prisma.job.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: jobFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Job.
     * @param {jobAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const job = await prisma.job.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: jobAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Jobs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobCountArgs} args - Arguments to filter Jobs to count.
     * @example
     * // Count the number of Jobs
     * const count = await prisma.job.count({
     *   where: {
     *     // ... the filter for the Jobs we want to count
     *   }
     * })
    **/
    count<T extends jobCountArgs>(
      args?: Subset<T, jobCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JobCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JobAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JobAggregateArgs>(args: Subset<T, JobAggregateArgs>): Prisma.PrismaPromise<GetJobAggregateType<T>>

    /**
     * Group by Job.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {jobGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends jobGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: jobGroupByArgs['orderBy'] }
        : { orderBy?: jobGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, jobGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJobGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the job model
   */
  readonly fields: jobFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for job.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__jobClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    company<T extends companyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, companyDefaultArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends job$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, job$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the job model
   */
  interface jobFieldRefs {
    readonly id: FieldRef<"job", 'String'>
    readonly title: FieldRef<"job", 'String'>
    readonly description: FieldRef<"job", 'String'>
    readonly location: FieldRef<"job", 'String'>
    readonly salary: FieldRef<"job", 'Int'>
    readonly employment_type: FieldRef<"job", 'String'>
    readonly job_type: FieldRef<"job", 'String'>
    readonly apply_through: FieldRef<"job", 'String'>
    readonly companyId: FieldRef<"job", 'String'>
    readonly lastDate: FieldRef<"job", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * job findUnique
   */
  export type jobFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter, which job to fetch.
     */
    where: jobWhereUniqueInput
  }

  /**
   * job findUniqueOrThrow
   */
  export type jobFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter, which job to fetch.
     */
    where: jobWhereUniqueInput
  }

  /**
   * job findFirst
   */
  export type jobFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter, which job to fetch.
     */
    where?: jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jobs to fetch.
     */
    orderBy?: jobOrderByWithRelationInput | jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jobs.
     */
    cursor?: jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * job findFirstOrThrow
   */
  export type jobFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter, which job to fetch.
     */
    where?: jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jobs to fetch.
     */
    orderBy?: jobOrderByWithRelationInput | jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for jobs.
     */
    cursor?: jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jobs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of jobs.
     */
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * job findMany
   */
  export type jobFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter, which jobs to fetch.
     */
    where?: jobWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of jobs to fetch.
     */
    orderBy?: jobOrderByWithRelationInput | jobOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing jobs.
     */
    cursor?: jobWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` jobs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` jobs.
     */
    skip?: number
    distinct?: JobScalarFieldEnum | JobScalarFieldEnum[]
  }

  /**
   * job create
   */
  export type jobCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * The data needed to create a job.
     */
    data: XOR<jobCreateInput, jobUncheckedCreateInput>
  }

  /**
   * job createMany
   */
  export type jobCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many jobs.
     */
    data: jobCreateManyInput | jobCreateManyInput[]
  }

  /**
   * job update
   */
  export type jobUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * The data needed to update a job.
     */
    data: XOR<jobUpdateInput, jobUncheckedUpdateInput>
    /**
     * Choose, which job to update.
     */
    where: jobWhereUniqueInput
  }

  /**
   * job updateMany
   */
  export type jobUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update jobs.
     */
    data: XOR<jobUpdateManyMutationInput, jobUncheckedUpdateManyInput>
    /**
     * Filter which jobs to update
     */
    where?: jobWhereInput
    /**
     * Limit how many jobs to update.
     */
    limit?: number
  }

  /**
   * job upsert
   */
  export type jobUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * The filter to search for the job to update in case it exists.
     */
    where: jobWhereUniqueInput
    /**
     * In case the job found by the `where` argument doesn't exist, create a new job with this data.
     */
    create: XOR<jobCreateInput, jobUncheckedCreateInput>
    /**
     * In case the job was found with the provided `where` argument, update it with this data.
     */
    update: XOR<jobUpdateInput, jobUncheckedUpdateInput>
  }

  /**
   * job delete
   */
  export type jobDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
    /**
     * Filter which job to delete.
     */
    where: jobWhereUniqueInput
  }

  /**
   * job deleteMany
   */
  export type jobDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which jobs to delete
     */
    where?: jobWhereInput
    /**
     * Limit how many jobs to delete.
     */
    limit?: number
  }

  /**
   * job findRaw
   */
  export type jobFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * job aggregateRaw
   */
  export type jobAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * job.applications
   */
  export type job$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    where?: ApplicationsWhereInput
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    cursor?: ApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * job without action
   */
  export type jobDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the job
     */
    select?: jobSelect<ExtArgs> | null
    /**
     * Omit specific fields from the job
     */
    omit?: jobOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: jobInclude<ExtArgs> | null
  }


  /**
   * Model review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    companyId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    content: string | null
    userId: string | null
    companyId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    content: number
    userId: number
    companyId: number
    _all: number
  }


  export type ReviewMinAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    companyId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    companyId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    content?: true
    userId?: true
    companyId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which review to aggregate.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type reviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: reviewWhereInput
    orderBy?: reviewOrderByWithAggregationInput | reviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: reviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    content: string
    userId: string
    companyId: string
    _count: ReviewCountAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends reviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type reviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    userId?: boolean
    companyId?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    company?: boolean | companyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>



  export type reviewSelectScalar = {
    id?: boolean
    content?: boolean
    userId?: boolean
    companyId?: boolean
  }

  export type reviewOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "userId" | "companyId", ExtArgs["result"]["review"]>
  export type reviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    company?: boolean | companyDefaultArgs<ExtArgs>
  }

  export type $reviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "review"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      company: Prisma.$companyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      userId: string
      companyId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type reviewGetPayload<S extends boolean | null | undefined | reviewDefaultArgs> = $Result.GetResult<Prisma.$reviewPayload, S>

  type reviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<reviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface reviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['review'], meta: { name: 'review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {reviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends reviewFindUniqueArgs>(args: SelectSubset<T, reviewFindUniqueArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {reviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends reviewFindUniqueOrThrowArgs>(args: SelectSubset<T, reviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends reviewFindFirstArgs>(args?: SelectSubset<T, reviewFindFirstArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends reviewFindFirstOrThrowArgs>(args?: SelectSubset<T, reviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends reviewFindManyArgs>(args?: SelectSubset<T, reviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Review.
     * @param {reviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends reviewCreateArgs>(args: SelectSubset<T, reviewCreateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reviews.
     * @param {reviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends reviewCreateManyArgs>(args?: SelectSubset<T, reviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {reviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends reviewDeleteArgs>(args: SelectSubset<T, reviewDeleteArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Review.
     * @param {reviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends reviewUpdateArgs>(args: SelectSubset<T, reviewUpdateArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reviews.
     * @param {reviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends reviewDeleteManyArgs>(args?: SelectSubset<T, reviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends reviewUpdateManyArgs>(args: SelectSubset<T, reviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {reviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends reviewUpsertArgs>(args: SelectSubset<T, reviewUpsertArgs<ExtArgs>>): Prisma__reviewClient<$Result.GetResult<Prisma.$reviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {reviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: reviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {reviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: reviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends reviewCountArgs>(
      args?: Subset<T, reviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends reviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: reviewGroupByArgs['orderBy'] }
        : { orderBy?: reviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, reviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the review model
   */
  readonly fields: reviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__reviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    company<T extends companyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, companyDefaultArgs<ExtArgs>>): Prisma__companyClient<$Result.GetResult<Prisma.$companyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the review model
   */
  interface reviewFieldRefs {
    readonly id: FieldRef<"review", 'String'>
    readonly content: FieldRef<"review", 'String'>
    readonly userId: FieldRef<"review", 'String'>
    readonly companyId: FieldRef<"review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * review findUnique
   */
  export type reviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findUniqueOrThrow
   */
  export type reviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review findFirst
   */
  export type reviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findFirstOrThrow
   */
  export type reviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which review to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review findMany
   */
  export type reviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter, which reviews to fetch.
     */
    where?: reviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reviews to fetch.
     */
    orderBy?: reviewOrderByWithRelationInput | reviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reviews.
     */
    cursor?: reviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * review create
   */
  export type reviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to create a review.
     */
    data: XOR<reviewCreateInput, reviewUncheckedCreateInput>
  }

  /**
   * review createMany
   */
  export type reviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reviews.
     */
    data: reviewCreateManyInput | reviewCreateManyInput[]
  }

  /**
   * review update
   */
  export type reviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The data needed to update a review.
     */
    data: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
    /**
     * Choose, which review to update.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review updateMany
   */
  export type reviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reviews.
     */
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyInput>
    /**
     * Filter which reviews to update
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to update.
     */
    limit?: number
  }

  /**
   * review upsert
   */
  export type reviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * The filter to search for the review to update in case it exists.
     */
    where: reviewWhereUniqueInput
    /**
     * In case the review found by the `where` argument doesn't exist, create a new review with this data.
     */
    create: XOR<reviewCreateInput, reviewUncheckedCreateInput>
    /**
     * In case the review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reviewUpdateInput, reviewUncheckedUpdateInput>
  }

  /**
   * review delete
   */
  export type reviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
    /**
     * Filter which review to delete.
     */
    where: reviewWhereUniqueInput
  }

  /**
   * review deleteMany
   */
  export type reviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which reviews to delete
     */
    where?: reviewWhereInput
    /**
     * Limit how many reviews to delete.
     */
    limit?: number
  }

  /**
   * review findRaw
   */
  export type reviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * review aggregateRaw
   */
  export type reviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * review without action
   */
  export type reviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the review
     */
    select?: reviewSelect<ExtArgs> | null
    /**
     * Omit specific fields from the review
     */
    omit?: reviewOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: reviewInclude<ExtArgs> | null
  }


  /**
   * Model Applications
   */

  export type AggregateApplications = {
    _count: ApplicationsCountAggregateOutputType | null
    _min: ApplicationsMinAggregateOutputType | null
    _max: ApplicationsMaxAggregateOutputType | null
  }

  export type ApplicationsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    job_id: string | null
    resumeId: string | null
    status: string | null
    appliedAt: Date | null
    statusNote: string | null
    notes: string | null
    updatedAt: Date | null
  }

  export type ApplicationsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    job_id: string | null
    resumeId: string | null
    status: string | null
    appliedAt: Date | null
    statusNote: string | null
    notes: string | null
    updatedAt: Date | null
  }

  export type ApplicationsCountAggregateOutputType = {
    id: number
    user_id: number
    job_id: number
    resumeId: number
    status: number
    appliedAt: number
    statusNote: number
    notes: number
    updatedAt: number
    _all: number
  }


  export type ApplicationsMinAggregateInputType = {
    id?: true
    user_id?: true
    job_id?: true
    resumeId?: true
    status?: true
    appliedAt?: true
    statusNote?: true
    notes?: true
    updatedAt?: true
  }

  export type ApplicationsMaxAggregateInputType = {
    id?: true
    user_id?: true
    job_id?: true
    resumeId?: true
    status?: true
    appliedAt?: true
    statusNote?: true
    notes?: true
    updatedAt?: true
  }

  export type ApplicationsCountAggregateInputType = {
    id?: true
    user_id?: true
    job_id?: true
    resumeId?: true
    status?: true
    appliedAt?: true
    statusNote?: true
    notes?: true
    updatedAt?: true
    _all?: true
  }

  export type ApplicationsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to aggregate.
     */
    where?: ApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Applications
    **/
    _count?: true | ApplicationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ApplicationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ApplicationsMaxAggregateInputType
  }

  export type GetApplicationsAggregateType<T extends ApplicationsAggregateArgs> = {
        [P in keyof T & keyof AggregateApplications]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateApplications[P]>
      : GetScalarType<T[P], AggregateApplications[P]>
  }




  export type ApplicationsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ApplicationsWhereInput
    orderBy?: ApplicationsOrderByWithAggregationInput | ApplicationsOrderByWithAggregationInput[]
    by: ApplicationsScalarFieldEnum[] | ApplicationsScalarFieldEnum
    having?: ApplicationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ApplicationsCountAggregateInputType | true
    _min?: ApplicationsMinAggregateInputType
    _max?: ApplicationsMaxAggregateInputType
  }

  export type ApplicationsGroupByOutputType = {
    id: string
    user_id: string
    job_id: string
    resumeId: string | null
    status: string
    appliedAt: Date | null
    statusNote: string | null
    notes: string | null
    updatedAt: Date | null
    _count: ApplicationsCountAggregateOutputType | null
    _min: ApplicationsMinAggregateOutputType | null
    _max: ApplicationsMaxAggregateOutputType | null
  }

  type GetApplicationsGroupByPayload<T extends ApplicationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ApplicationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ApplicationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ApplicationsGroupByOutputType[P]>
            : GetScalarType<T[P], ApplicationsGroupByOutputType[P]>
        }
      >
    >


  export type ApplicationsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    job_id?: boolean
    resumeId?: boolean
    status?: boolean
    appliedAt?: boolean
    statusNote?: boolean
    notes?: boolean
    updatedAt?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    jobs?: boolean | jobDefaultArgs<ExtArgs>
    Resume?: boolean | Applications$ResumeArgs<ExtArgs>
  }, ExtArgs["result"]["applications"]>



  export type ApplicationsSelectScalar = {
    id?: boolean
    user_id?: boolean
    job_id?: boolean
    resumeId?: boolean
    status?: boolean
    appliedAt?: boolean
    statusNote?: boolean
    notes?: boolean
    updatedAt?: boolean
  }

  export type ApplicationsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "job_id" | "resumeId" | "status" | "appliedAt" | "statusNote" | "notes" | "updatedAt", ExtArgs["result"]["applications"]>
  export type ApplicationsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    jobs?: boolean | jobDefaultArgs<ExtArgs>
    Resume?: boolean | Applications$ResumeArgs<ExtArgs>
  }

  export type $ApplicationsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Applications"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      jobs: Prisma.$jobPayload<ExtArgs>
      Resume: Prisma.$ResumePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      job_id: string
      resumeId: string | null
      status: string
      appliedAt: Date | null
      statusNote: string | null
      notes: string | null
      updatedAt: Date | null
    }, ExtArgs["result"]["applications"]>
    composites: {}
  }

  type ApplicationsGetPayload<S extends boolean | null | undefined | ApplicationsDefaultArgs> = $Result.GetResult<Prisma.$ApplicationsPayload, S>

  type ApplicationsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ApplicationsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ApplicationsCountAggregateInputType | true
    }

  export interface ApplicationsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Applications'], meta: { name: 'Applications' } }
    /**
     * Find zero or one Applications that matches the filter.
     * @param {ApplicationsFindUniqueArgs} args - Arguments to find a Applications
     * @example
     * // Get one Applications
     * const applications = await prisma.applications.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ApplicationsFindUniqueArgs>(args: SelectSubset<T, ApplicationsFindUniqueArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Applications that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ApplicationsFindUniqueOrThrowArgs} args - Arguments to find a Applications
     * @example
     * // Get one Applications
     * const applications = await prisma.applications.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ApplicationsFindUniqueOrThrowArgs>(args: SelectSubset<T, ApplicationsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsFindFirstArgs} args - Arguments to find a Applications
     * @example
     * // Get one Applications
     * const applications = await prisma.applications.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ApplicationsFindFirstArgs>(args?: SelectSubset<T, ApplicationsFindFirstArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Applications that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsFindFirstOrThrowArgs} args - Arguments to find a Applications
     * @example
     * // Get one Applications
     * const applications = await prisma.applications.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ApplicationsFindFirstOrThrowArgs>(args?: SelectSubset<T, ApplicationsFindFirstOrThrowArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Applications
     * const applications = await prisma.applications.findMany()
     * 
     * // Get first 10 Applications
     * const applications = await prisma.applications.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const applicationsWithIdOnly = await prisma.applications.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ApplicationsFindManyArgs>(args?: SelectSubset<T, ApplicationsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Applications.
     * @param {ApplicationsCreateArgs} args - Arguments to create a Applications.
     * @example
     * // Create one Applications
     * const Applications = await prisma.applications.create({
     *   data: {
     *     // ... data to create a Applications
     *   }
     * })
     * 
     */
    create<T extends ApplicationsCreateArgs>(args: SelectSubset<T, ApplicationsCreateArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Applications.
     * @param {ApplicationsCreateManyArgs} args - Arguments to create many Applications.
     * @example
     * // Create many Applications
     * const applications = await prisma.applications.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ApplicationsCreateManyArgs>(args?: SelectSubset<T, ApplicationsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Applications.
     * @param {ApplicationsDeleteArgs} args - Arguments to delete one Applications.
     * @example
     * // Delete one Applications
     * const Applications = await prisma.applications.delete({
     *   where: {
     *     // ... filter to delete one Applications
     *   }
     * })
     * 
     */
    delete<T extends ApplicationsDeleteArgs>(args: SelectSubset<T, ApplicationsDeleteArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Applications.
     * @param {ApplicationsUpdateArgs} args - Arguments to update one Applications.
     * @example
     * // Update one Applications
     * const applications = await prisma.applications.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ApplicationsUpdateArgs>(args: SelectSubset<T, ApplicationsUpdateArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Applications.
     * @param {ApplicationsDeleteManyArgs} args - Arguments to filter Applications to delete.
     * @example
     * // Delete a few Applications
     * const { count } = await prisma.applications.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ApplicationsDeleteManyArgs>(args?: SelectSubset<T, ApplicationsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Applications
     * const applications = await prisma.applications.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ApplicationsUpdateManyArgs>(args: SelectSubset<T, ApplicationsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Applications.
     * @param {ApplicationsUpsertArgs} args - Arguments to update or create a Applications.
     * @example
     * // Update or create a Applications
     * const applications = await prisma.applications.upsert({
     *   create: {
     *     // ... data to create a Applications
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Applications we want to update
     *   }
     * })
     */
    upsert<T extends ApplicationsUpsertArgs>(args: SelectSubset<T, ApplicationsUpsertArgs<ExtArgs>>): Prisma__ApplicationsClient<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Applications that matches the filter.
     * @param {ApplicationsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const applications = await prisma.applications.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ApplicationsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Applications.
     * @param {ApplicationsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const applications = await prisma.applications.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ApplicationsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsCountArgs} args - Arguments to filter Applications to count.
     * @example
     * // Count the number of Applications
     * const count = await prisma.applications.count({
     *   where: {
     *     // ... the filter for the Applications we want to count
     *   }
     * })
    **/
    count<T extends ApplicationsCountArgs>(
      args?: Subset<T, ApplicationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ApplicationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ApplicationsAggregateArgs>(args: Subset<T, ApplicationsAggregateArgs>): Prisma.PrismaPromise<GetApplicationsAggregateType<T>>

    /**
     * Group by Applications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ApplicationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ApplicationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ApplicationsGroupByArgs['orderBy'] }
        : { orderBy?: ApplicationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ApplicationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetApplicationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Applications model
   */
  readonly fields: ApplicationsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Applications.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ApplicationsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    jobs<T extends jobDefaultArgs<ExtArgs> = {}>(args?: Subset<T, jobDefaultArgs<ExtArgs>>): Prisma__jobClient<$Result.GetResult<Prisma.$jobPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    Resume<T extends Applications$ResumeArgs<ExtArgs> = {}>(args?: Subset<T, Applications$ResumeArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Applications model
   */
  interface ApplicationsFieldRefs {
    readonly id: FieldRef<"Applications", 'String'>
    readonly user_id: FieldRef<"Applications", 'String'>
    readonly job_id: FieldRef<"Applications", 'String'>
    readonly resumeId: FieldRef<"Applications", 'String'>
    readonly status: FieldRef<"Applications", 'String'>
    readonly appliedAt: FieldRef<"Applications", 'DateTime'>
    readonly statusNote: FieldRef<"Applications", 'String'>
    readonly notes: FieldRef<"Applications", 'String'>
    readonly updatedAt: FieldRef<"Applications", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Applications findUnique
   */
  export type ApplicationsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where: ApplicationsWhereUniqueInput
  }

  /**
   * Applications findUniqueOrThrow
   */
  export type ApplicationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where: ApplicationsWhereUniqueInput
  }

  /**
   * Applications findFirst
   */
  export type ApplicationsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * Applications findFirstOrThrow
   */
  export type ApplicationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Applications.
     */
    cursor?: ApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Applications.
     */
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * Applications findMany
   */
  export type ApplicationsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter, which Applications to fetch.
     */
    where?: ApplicationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Applications to fetch.
     */
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Applications.
     */
    cursor?: ApplicationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Applications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Applications.
     */
    skip?: number
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * Applications create
   */
  export type ApplicationsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * The data needed to create a Applications.
     */
    data: XOR<ApplicationsCreateInput, ApplicationsUncheckedCreateInput>
  }

  /**
   * Applications createMany
   */
  export type ApplicationsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Applications.
     */
    data: ApplicationsCreateManyInput | ApplicationsCreateManyInput[]
  }

  /**
   * Applications update
   */
  export type ApplicationsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * The data needed to update a Applications.
     */
    data: XOR<ApplicationsUpdateInput, ApplicationsUncheckedUpdateInput>
    /**
     * Choose, which Applications to update.
     */
    where: ApplicationsWhereUniqueInput
  }

  /**
   * Applications updateMany
   */
  export type ApplicationsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Applications.
     */
    data: XOR<ApplicationsUpdateManyMutationInput, ApplicationsUncheckedUpdateManyInput>
    /**
     * Filter which Applications to update
     */
    where?: ApplicationsWhereInput
    /**
     * Limit how many Applications to update.
     */
    limit?: number
  }

  /**
   * Applications upsert
   */
  export type ApplicationsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * The filter to search for the Applications to update in case it exists.
     */
    where: ApplicationsWhereUniqueInput
    /**
     * In case the Applications found by the `where` argument doesn't exist, create a new Applications with this data.
     */
    create: XOR<ApplicationsCreateInput, ApplicationsUncheckedCreateInput>
    /**
     * In case the Applications was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ApplicationsUpdateInput, ApplicationsUncheckedUpdateInput>
  }

  /**
   * Applications delete
   */
  export type ApplicationsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    /**
     * Filter which Applications to delete.
     */
    where: ApplicationsWhereUniqueInput
  }

  /**
   * Applications deleteMany
   */
  export type ApplicationsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Applications to delete
     */
    where?: ApplicationsWhereInput
    /**
     * Limit how many Applications to delete.
     */
    limit?: number
  }

  /**
   * Applications findRaw
   */
  export type ApplicationsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Applications aggregateRaw
   */
  export type ApplicationsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Applications.Resume
   */
  export type Applications$ResumeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    where?: ResumeWhereInput
  }

  /**
   * Applications without action
   */
  export type ApplicationsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
  }


  /**
   * Model Resume
   */

  export type AggregateResume = {
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  export type ResumeMinAggregateOutputType = {
    id: string | null
    title: string | null
    summary: string | null
    phone: string | null
    location: string | null
    website: string | null
    userId: string | null
    resumePdfUrl: string | null
    resumePdfName: string | null
    profileImageUrl: string | null
  }

  export type ResumeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    summary: string | null
    phone: string | null
    location: string | null
    website: string | null
    userId: string | null
    resumePdfUrl: string | null
    resumePdfName: string | null
    profileImageUrl: string | null
  }

  export type ResumeCountAggregateOutputType = {
    id: number
    title: number
    summary: number
    phone: number
    location: number
    website: number
    userId: number
    educations: number
    experiences: number
    skills: number
    projects: number
    resumePdfUrl: number
    resumePdfName: number
    profileImageUrl: number
    _all: number
  }


  export type ResumeMinAggregateInputType = {
    id?: true
    title?: true
    summary?: true
    phone?: true
    location?: true
    website?: true
    userId?: true
    resumePdfUrl?: true
    resumePdfName?: true
    profileImageUrl?: true
  }

  export type ResumeMaxAggregateInputType = {
    id?: true
    title?: true
    summary?: true
    phone?: true
    location?: true
    website?: true
    userId?: true
    resumePdfUrl?: true
    resumePdfName?: true
    profileImageUrl?: true
  }

  export type ResumeCountAggregateInputType = {
    id?: true
    title?: true
    summary?: true
    phone?: true
    location?: true
    website?: true
    userId?: true
    educations?: true
    experiences?: true
    skills?: true
    projects?: true
    resumePdfUrl?: true
    resumePdfName?: true
    profileImageUrl?: true
    _all?: true
  }

  export type ResumeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resume to aggregate.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Resumes
    **/
    _count?: true | ResumeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResumeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResumeMaxAggregateInputType
  }

  export type GetResumeAggregateType<T extends ResumeAggregateArgs> = {
        [P in keyof T & keyof AggregateResume]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResume[P]>
      : GetScalarType<T[P], AggregateResume[P]>
  }




  export type ResumeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResumeWhereInput
    orderBy?: ResumeOrderByWithAggregationInput | ResumeOrderByWithAggregationInput[]
    by: ResumeScalarFieldEnum[] | ResumeScalarFieldEnum
    having?: ResumeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResumeCountAggregateInputType | true
    _min?: ResumeMinAggregateInputType
    _max?: ResumeMaxAggregateInputType
  }

  export type ResumeGroupByOutputType = {
    id: string
    title: string
    summary: string | null
    phone: string | null
    location: string | null
    website: string | null
    userId: string
    educations: string[]
    experiences: string[]
    skills: string[]
    projects: string[]
    resumePdfUrl: string | null
    resumePdfName: string | null
    profileImageUrl: string | null
    _count: ResumeCountAggregateOutputType | null
    _min: ResumeMinAggregateOutputType | null
    _max: ResumeMaxAggregateOutputType | null
  }

  type GetResumeGroupByPayload<T extends ResumeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResumeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResumeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResumeGroupByOutputType[P]>
            : GetScalarType<T[P], ResumeGroupByOutputType[P]>
        }
      >
    >


  export type ResumeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    summary?: boolean
    phone?: boolean
    location?: boolean
    website?: boolean
    userId?: boolean
    educations?: boolean
    experiences?: boolean
    skills?: boolean
    projects?: boolean
    resumePdfUrl?: boolean
    resumePdfName?: boolean
    profileImageUrl?: boolean
    user?: boolean | userDefaultArgs<ExtArgs>
    applications?: boolean | Resume$applicationsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["resume"]>



  export type ResumeSelectScalar = {
    id?: boolean
    title?: boolean
    summary?: boolean
    phone?: boolean
    location?: boolean
    website?: boolean
    userId?: boolean
    educations?: boolean
    experiences?: boolean
    skills?: boolean
    projects?: boolean
    resumePdfUrl?: boolean
    resumePdfName?: boolean
    profileImageUrl?: boolean
  }

  export type ResumeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "summary" | "phone" | "location" | "website" | "userId" | "educations" | "experiences" | "skills" | "projects" | "resumePdfUrl" | "resumePdfName" | "profileImageUrl", ExtArgs["result"]["resume"]>
  export type ResumeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | userDefaultArgs<ExtArgs>
    applications?: boolean | Resume$applicationsArgs<ExtArgs>
    _count?: boolean | ResumeCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ResumePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Resume"
    objects: {
      user: Prisma.$userPayload<ExtArgs>
      applications: Prisma.$ApplicationsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      summary: string | null
      phone: string | null
      location: string | null
      website: string | null
      userId: string
      educations: string[]
      experiences: string[]
      skills: string[]
      projects: string[]
      resumePdfUrl: string | null
      resumePdfName: string | null
      profileImageUrl: string | null
    }, ExtArgs["result"]["resume"]>
    composites: {}
  }

  type ResumeGetPayload<S extends boolean | null | undefined | ResumeDefaultArgs> = $Result.GetResult<Prisma.$ResumePayload, S>

  type ResumeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResumeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResumeCountAggregateInputType | true
    }

  export interface ResumeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Resume'], meta: { name: 'Resume' } }
    /**
     * Find zero or one Resume that matches the filter.
     * @param {ResumeFindUniqueArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResumeFindUniqueArgs>(args: SelectSubset<T, ResumeFindUniqueArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Resume that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResumeFindUniqueOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResumeFindUniqueOrThrowArgs>(args: SelectSubset<T, ResumeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResumeFindFirstArgs>(args?: SelectSubset<T, ResumeFindFirstArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Resume that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindFirstOrThrowArgs} args - Arguments to find a Resume
     * @example
     * // Get one Resume
     * const resume = await prisma.resume.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResumeFindFirstOrThrowArgs>(args?: SelectSubset<T, ResumeFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Resumes
     * const resumes = await prisma.resume.findMany()
     * 
     * // Get first 10 Resumes
     * const resumes = await prisma.resume.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resumeWithIdOnly = await prisma.resume.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResumeFindManyArgs>(args?: SelectSubset<T, ResumeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Resume.
     * @param {ResumeCreateArgs} args - Arguments to create a Resume.
     * @example
     * // Create one Resume
     * const Resume = await prisma.resume.create({
     *   data: {
     *     // ... data to create a Resume
     *   }
     * })
     * 
     */
    create<T extends ResumeCreateArgs>(args: SelectSubset<T, ResumeCreateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Resumes.
     * @param {ResumeCreateManyArgs} args - Arguments to create many Resumes.
     * @example
     * // Create many Resumes
     * const resume = await prisma.resume.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResumeCreateManyArgs>(args?: SelectSubset<T, ResumeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Resume.
     * @param {ResumeDeleteArgs} args - Arguments to delete one Resume.
     * @example
     * // Delete one Resume
     * const Resume = await prisma.resume.delete({
     *   where: {
     *     // ... filter to delete one Resume
     *   }
     * })
     * 
     */
    delete<T extends ResumeDeleteArgs>(args: SelectSubset<T, ResumeDeleteArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Resume.
     * @param {ResumeUpdateArgs} args - Arguments to update one Resume.
     * @example
     * // Update one Resume
     * const resume = await prisma.resume.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResumeUpdateArgs>(args: SelectSubset<T, ResumeUpdateArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Resumes.
     * @param {ResumeDeleteManyArgs} args - Arguments to filter Resumes to delete.
     * @example
     * // Delete a few Resumes
     * const { count } = await prisma.resume.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResumeDeleteManyArgs>(args?: SelectSubset<T, ResumeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Resumes
     * const resume = await prisma.resume.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResumeUpdateManyArgs>(args: SelectSubset<T, ResumeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Resume.
     * @param {ResumeUpsertArgs} args - Arguments to update or create a Resume.
     * @example
     * // Update or create a Resume
     * const resume = await prisma.resume.upsert({
     *   create: {
     *     // ... data to create a Resume
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Resume we want to update
     *   }
     * })
     */
    upsert<T extends ResumeUpsertArgs>(args: SelectSubset<T, ResumeUpsertArgs<ExtArgs>>): Prisma__ResumeClient<$Result.GetResult<Prisma.$ResumePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Resumes that matches the filter.
     * @param {ResumeFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const resume = await prisma.resume.findRaw({
     *   filter: { age: { $gt: 25 } }
     * })
     */
    findRaw(args?: ResumeFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Resume.
     * @param {ResumeAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const resume = await prisma.resume.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ResumeAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Resumes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeCountArgs} args - Arguments to filter Resumes to count.
     * @example
     * // Count the number of Resumes
     * const count = await prisma.resume.count({
     *   where: {
     *     // ... the filter for the Resumes we want to count
     *   }
     * })
    **/
    count<T extends ResumeCountArgs>(
      args?: Subset<T, ResumeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResumeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResumeAggregateArgs>(args: Subset<T, ResumeAggregateArgs>): Prisma.PrismaPromise<GetResumeAggregateType<T>>

    /**
     * Group by Resume.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResumeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResumeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResumeGroupByArgs['orderBy'] }
        : { orderBy?: ResumeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResumeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResumeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Resume model
   */
  readonly fields: ResumeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Resume.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResumeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    applications<T extends Resume$applicationsArgs<ExtArgs> = {}>(args?: Subset<T, Resume$applicationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ApplicationsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Resume model
   */
  interface ResumeFieldRefs {
    readonly id: FieldRef<"Resume", 'String'>
    readonly title: FieldRef<"Resume", 'String'>
    readonly summary: FieldRef<"Resume", 'String'>
    readonly phone: FieldRef<"Resume", 'String'>
    readonly location: FieldRef<"Resume", 'String'>
    readonly website: FieldRef<"Resume", 'String'>
    readonly userId: FieldRef<"Resume", 'String'>
    readonly educations: FieldRef<"Resume", 'String[]'>
    readonly experiences: FieldRef<"Resume", 'String[]'>
    readonly skills: FieldRef<"Resume", 'String[]'>
    readonly projects: FieldRef<"Resume", 'String[]'>
    readonly resumePdfUrl: FieldRef<"Resume", 'String'>
    readonly resumePdfName: FieldRef<"Resume", 'String'>
    readonly profileImageUrl: FieldRef<"Resume", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Resume findUnique
   */
  export type ResumeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findUniqueOrThrow
   */
  export type ResumeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume findFirst
   */
  export type ResumeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findFirstOrThrow
   */
  export type ResumeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resume to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Resumes.
     */
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume findMany
   */
  export type ResumeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter, which Resumes to fetch.
     */
    where?: ResumeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Resumes to fetch.
     */
    orderBy?: ResumeOrderByWithRelationInput | ResumeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Resumes.
     */
    cursor?: ResumeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Resumes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Resumes.
     */
    skip?: number
    distinct?: ResumeScalarFieldEnum | ResumeScalarFieldEnum[]
  }

  /**
   * Resume create
   */
  export type ResumeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to create a Resume.
     */
    data: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
  }

  /**
   * Resume createMany
   */
  export type ResumeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Resumes.
     */
    data: ResumeCreateManyInput | ResumeCreateManyInput[]
  }

  /**
   * Resume update
   */
  export type ResumeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The data needed to update a Resume.
     */
    data: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
    /**
     * Choose, which Resume to update.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume updateMany
   */
  export type ResumeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Resumes.
     */
    data: XOR<ResumeUpdateManyMutationInput, ResumeUncheckedUpdateManyInput>
    /**
     * Filter which Resumes to update
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to update.
     */
    limit?: number
  }

  /**
   * Resume upsert
   */
  export type ResumeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * The filter to search for the Resume to update in case it exists.
     */
    where: ResumeWhereUniqueInput
    /**
     * In case the Resume found by the `where` argument doesn't exist, create a new Resume with this data.
     */
    create: XOR<ResumeCreateInput, ResumeUncheckedCreateInput>
    /**
     * In case the Resume was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResumeUpdateInput, ResumeUncheckedUpdateInput>
  }

  /**
   * Resume delete
   */
  export type ResumeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
    /**
     * Filter which Resume to delete.
     */
    where: ResumeWhereUniqueInput
  }

  /**
   * Resume deleteMany
   */
  export type ResumeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Resumes to delete
     */
    where?: ResumeWhereInput
    /**
     * Limit how many Resumes to delete.
     */
    limit?: number
  }

  /**
   * Resume findRaw
   */
  export type ResumeFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Resume aggregateRaw
   */
  export type ResumeAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Resume.applications
   */
  export type Resume$applicationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Applications
     */
    select?: ApplicationsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Applications
     */
    omit?: ApplicationsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ApplicationsInclude<ExtArgs> | null
    where?: ApplicationsWhereInput
    orderBy?: ApplicationsOrderByWithRelationInput | ApplicationsOrderByWithRelationInput[]
    cursor?: ApplicationsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ApplicationsScalarFieldEnum | ApplicationsScalarFieldEnum[]
  }

  /**
   * Resume without action
   */
  export type ResumeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Resume
     */
    select?: ResumeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Resume
     */
    omit?: ResumeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResumeInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CompanyScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    ownerId: 'ownerId'
  };

  export type CompanyScalarFieldEnum = (typeof CompanyScalarFieldEnum)[keyof typeof CompanyScalarFieldEnum]


  export const JobScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    location: 'location',
    salary: 'salary',
    employment_type: 'employment_type',
    job_type: 'job_type',
    apply_through: 'apply_through',
    companyId: 'companyId',
    lastDate: 'lastDate'
  };

  export type JobScalarFieldEnum = (typeof JobScalarFieldEnum)[keyof typeof JobScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
    id: 'id',
    content: 'content',
    userId: 'userId',
    companyId: 'companyId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const ApplicationsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    job_id: 'job_id',
    resumeId: 'resumeId',
    status: 'status',
    appliedAt: 'appliedAt',
    statusNote: 'statusNote',
    notes: 'notes',
    updatedAt: 'updatedAt'
  };

  export type ApplicationsScalarFieldEnum = (typeof ApplicationsScalarFieldEnum)[keyof typeof ApplicationsScalarFieldEnum]


  export const ResumeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    summary: 'summary',
    phone: 'phone',
    location: 'location',
    website: 'website',
    userId: 'userId',
    educations: 'educations',
    experiences: 'experiences',
    skills: 'skills',
    projects: 'projects',
    resumePdfUrl: 'resumePdfUrl',
    resumePdfName: 'resumePdfName',
    profileImageUrl: 'profileImageUrl'
  };

  export type ResumeScalarFieldEnum = (typeof ResumeScalarFieldEnum)[keyof typeof ResumeScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    email?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    role?: StringFilter<"user"> | string
    review?: ReviewListRelationFilter
    applied_jobs?: ApplicationsListRelationFilter
    Resume?: XOR<ResumeNullableScalarRelationFilter, ResumeWhereInput> | null
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    review?: reviewOrderByRelationAggregateInput
    applied_jobs?: ApplicationsOrderByRelationAggregateInput
    Resume?: ResumeOrderByWithRelationInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    password?: StringFilter<"user"> | string
    role?: StringFilter<"user"> | string
    review?: ReviewListRelationFilter
    applied_jobs?: ApplicationsListRelationFilter
    Resume?: XOR<ResumeNullableScalarRelationFilter, ResumeWhereInput> | null
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    email?: StringWithAggregatesFilter<"user"> | string
    password?: StringWithAggregatesFilter<"user"> | string
    role?: StringWithAggregatesFilter<"user"> | string
  }

  export type companyWhereInput = {
    AND?: companyWhereInput | companyWhereInput[]
    OR?: companyWhereInput[]
    NOT?: companyWhereInput | companyWhereInput[]
    id?: StringFilter<"company"> | string
    name?: StringFilter<"company"> | string
    description?: StringFilter<"company"> | string
    ownerId?: StringFilter<"company"> | string
    jobs?: JobListRelationFilter
    review?: ReviewListRelationFilter
  }

  export type companyOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    jobs?: jobOrderByRelationAggregateInput
    review?: reviewOrderByRelationAggregateInput
  }

  export type companyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    ownerId?: string
    AND?: companyWhereInput | companyWhereInput[]
    OR?: companyWhereInput[]
    NOT?: companyWhereInput | companyWhereInput[]
    name?: StringFilter<"company"> | string
    description?: StringFilter<"company"> | string
    jobs?: JobListRelationFilter
    review?: ReviewListRelationFilter
  }, "id" | "ownerId">

  export type companyOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    _count?: companyCountOrderByAggregateInput
    _max?: companyMaxOrderByAggregateInput
    _min?: companyMinOrderByAggregateInput
  }

  export type companyScalarWhereWithAggregatesInput = {
    AND?: companyScalarWhereWithAggregatesInput | companyScalarWhereWithAggregatesInput[]
    OR?: companyScalarWhereWithAggregatesInput[]
    NOT?: companyScalarWhereWithAggregatesInput | companyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"company"> | string
    name?: StringWithAggregatesFilter<"company"> | string
    description?: StringWithAggregatesFilter<"company"> | string
    ownerId?: StringWithAggregatesFilter<"company"> | string
  }

  export type jobWhereInput = {
    AND?: jobWhereInput | jobWhereInput[]
    OR?: jobWhereInput[]
    NOT?: jobWhereInput | jobWhereInput[]
    id?: StringFilter<"job"> | string
    title?: StringFilter<"job"> | string
    description?: StringFilter<"job"> | string
    location?: StringFilter<"job"> | string
    salary?: IntFilter<"job"> | number
    employment_type?: StringFilter<"job"> | string
    job_type?: StringFilter<"job"> | string
    apply_through?: StringFilter<"job"> | string
    companyId?: StringFilter<"job"> | string
    lastDate?: DateTimeNullableFilter<"job"> | Date | string | null
    company?: XOR<CompanyScalarRelationFilter, companyWhereInput>
    applications?: ApplicationsListRelationFilter
  }

  export type jobOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    salary?: SortOrder
    employment_type?: SortOrder
    job_type?: SortOrder
    apply_through?: SortOrder
    companyId?: SortOrder
    lastDate?: SortOrder
    company?: companyOrderByWithRelationInput
    applications?: ApplicationsOrderByRelationAggregateInput
  }

  export type jobWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: jobWhereInput | jobWhereInput[]
    OR?: jobWhereInput[]
    NOT?: jobWhereInput | jobWhereInput[]
    title?: StringFilter<"job"> | string
    description?: StringFilter<"job"> | string
    location?: StringFilter<"job"> | string
    salary?: IntFilter<"job"> | number
    employment_type?: StringFilter<"job"> | string
    job_type?: StringFilter<"job"> | string
    apply_through?: StringFilter<"job"> | string
    companyId?: StringFilter<"job"> | string
    lastDate?: DateTimeNullableFilter<"job"> | Date | string | null
    company?: XOR<CompanyScalarRelationFilter, companyWhereInput>
    applications?: ApplicationsListRelationFilter
  }, "id">

  export type jobOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    salary?: SortOrder
    employment_type?: SortOrder
    job_type?: SortOrder
    apply_through?: SortOrder
    companyId?: SortOrder
    lastDate?: SortOrder
    _count?: jobCountOrderByAggregateInput
    _avg?: jobAvgOrderByAggregateInput
    _max?: jobMaxOrderByAggregateInput
    _min?: jobMinOrderByAggregateInput
    _sum?: jobSumOrderByAggregateInput
  }

  export type jobScalarWhereWithAggregatesInput = {
    AND?: jobScalarWhereWithAggregatesInput | jobScalarWhereWithAggregatesInput[]
    OR?: jobScalarWhereWithAggregatesInput[]
    NOT?: jobScalarWhereWithAggregatesInput | jobScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"job"> | string
    title?: StringWithAggregatesFilter<"job"> | string
    description?: StringWithAggregatesFilter<"job"> | string
    location?: StringWithAggregatesFilter<"job"> | string
    salary?: IntWithAggregatesFilter<"job"> | number
    employment_type?: StringWithAggregatesFilter<"job"> | string
    job_type?: StringWithAggregatesFilter<"job"> | string
    apply_through?: StringWithAggregatesFilter<"job"> | string
    companyId?: StringWithAggregatesFilter<"job"> | string
    lastDate?: DateTimeNullableWithAggregatesFilter<"job"> | Date | string | null
  }

  export type reviewWhereInput = {
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    id?: StringFilter<"review"> | string
    content?: StringFilter<"review"> | string
    userId?: StringFilter<"review"> | string
    companyId?: StringFilter<"review"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    company?: XOR<CompanyScalarRelationFilter, companyWhereInput>
  }

  export type reviewOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    user?: userOrderByWithRelationInput
    company?: companyOrderByWithRelationInput
  }

  export type reviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: reviewWhereInput | reviewWhereInput[]
    OR?: reviewWhereInput[]
    NOT?: reviewWhereInput | reviewWhereInput[]
    content?: StringFilter<"review"> | string
    userId?: StringFilter<"review"> | string
    companyId?: StringFilter<"review"> | string
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    company?: XOR<CompanyScalarRelationFilter, companyWhereInput>
  }, "id">

  export type reviewOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
    _count?: reviewCountOrderByAggregateInput
    _max?: reviewMaxOrderByAggregateInput
    _min?: reviewMinOrderByAggregateInput
  }

  export type reviewScalarWhereWithAggregatesInput = {
    AND?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    OR?: reviewScalarWhereWithAggregatesInput[]
    NOT?: reviewScalarWhereWithAggregatesInput | reviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"review"> | string
    content?: StringWithAggregatesFilter<"review"> | string
    userId?: StringWithAggregatesFilter<"review"> | string
    companyId?: StringWithAggregatesFilter<"review"> | string
  }

  export type ApplicationsWhereInput = {
    AND?: ApplicationsWhereInput | ApplicationsWhereInput[]
    OR?: ApplicationsWhereInput[]
    NOT?: ApplicationsWhereInput | ApplicationsWhereInput[]
    id?: StringFilter<"Applications"> | string
    user_id?: StringFilter<"Applications"> | string
    job_id?: StringFilter<"Applications"> | string
    resumeId?: StringNullableFilter<"Applications"> | string | null
    status?: StringFilter<"Applications"> | string
    appliedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
    statusNote?: StringNullableFilter<"Applications"> | string | null
    notes?: StringNullableFilter<"Applications"> | string | null
    updatedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    jobs?: XOR<JobScalarRelationFilter, jobWhereInput>
    Resume?: XOR<ResumeNullableScalarRelationFilter, ResumeWhereInput> | null
  }

  export type ApplicationsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    job_id?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    appliedAt?: SortOrder
    statusNote?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
    user?: userOrderByWithRelationInput
    jobs?: jobOrderByWithRelationInput
    Resume?: ResumeOrderByWithRelationInput
  }

  export type ApplicationsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ApplicationsWhereInput | ApplicationsWhereInput[]
    OR?: ApplicationsWhereInput[]
    NOT?: ApplicationsWhereInput | ApplicationsWhereInput[]
    user_id?: StringFilter<"Applications"> | string
    job_id?: StringFilter<"Applications"> | string
    resumeId?: StringNullableFilter<"Applications"> | string | null
    status?: StringFilter<"Applications"> | string
    appliedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
    statusNote?: StringNullableFilter<"Applications"> | string | null
    notes?: StringNullableFilter<"Applications"> | string | null
    updatedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    jobs?: XOR<JobScalarRelationFilter, jobWhereInput>
    Resume?: XOR<ResumeNullableScalarRelationFilter, ResumeWhereInput> | null
  }, "id">

  export type ApplicationsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    job_id?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    appliedAt?: SortOrder
    statusNote?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
    _count?: ApplicationsCountOrderByAggregateInput
    _max?: ApplicationsMaxOrderByAggregateInput
    _min?: ApplicationsMinOrderByAggregateInput
  }

  export type ApplicationsScalarWhereWithAggregatesInput = {
    AND?: ApplicationsScalarWhereWithAggregatesInput | ApplicationsScalarWhereWithAggregatesInput[]
    OR?: ApplicationsScalarWhereWithAggregatesInput[]
    NOT?: ApplicationsScalarWhereWithAggregatesInput | ApplicationsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Applications"> | string
    user_id?: StringWithAggregatesFilter<"Applications"> | string
    job_id?: StringWithAggregatesFilter<"Applications"> | string
    resumeId?: StringNullableWithAggregatesFilter<"Applications"> | string | null
    status?: StringWithAggregatesFilter<"Applications"> | string
    appliedAt?: DateTimeNullableWithAggregatesFilter<"Applications"> | Date | string | null
    statusNote?: StringNullableWithAggregatesFilter<"Applications"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Applications"> | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Applications"> | Date | string | null
  }

  export type ResumeWhereInput = {
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    id?: StringFilter<"Resume"> | string
    title?: StringFilter<"Resume"> | string
    summary?: StringNullableFilter<"Resume"> | string | null
    phone?: StringNullableFilter<"Resume"> | string | null
    location?: StringNullableFilter<"Resume"> | string | null
    website?: StringNullableFilter<"Resume"> | string | null
    userId?: StringFilter<"Resume"> | string
    educations?: StringNullableListFilter<"Resume">
    experiences?: StringNullableListFilter<"Resume">
    skills?: StringNullableListFilter<"Resume">
    projects?: StringNullableListFilter<"Resume">
    resumePdfUrl?: StringNullableFilter<"Resume"> | string | null
    resumePdfName?: StringNullableFilter<"Resume"> | string | null
    profileImageUrl?: StringNullableFilter<"Resume"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    applications?: ApplicationsListRelationFilter
  }

  export type ResumeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    website?: SortOrder
    userId?: SortOrder
    educations?: SortOrder
    experiences?: SortOrder
    skills?: SortOrder
    projects?: SortOrder
    resumePdfUrl?: SortOrder
    resumePdfName?: SortOrder
    profileImageUrl?: SortOrder
    user?: userOrderByWithRelationInput
    applications?: ApplicationsOrderByRelationAggregateInput
  }

  export type ResumeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ResumeWhereInput | ResumeWhereInput[]
    OR?: ResumeWhereInput[]
    NOT?: ResumeWhereInput | ResumeWhereInput[]
    title?: StringFilter<"Resume"> | string
    summary?: StringNullableFilter<"Resume"> | string | null
    phone?: StringNullableFilter<"Resume"> | string | null
    location?: StringNullableFilter<"Resume"> | string | null
    website?: StringNullableFilter<"Resume"> | string | null
    educations?: StringNullableListFilter<"Resume">
    experiences?: StringNullableListFilter<"Resume">
    skills?: StringNullableListFilter<"Resume">
    projects?: StringNullableListFilter<"Resume">
    resumePdfUrl?: StringNullableFilter<"Resume"> | string | null
    resumePdfName?: StringNullableFilter<"Resume"> | string | null
    profileImageUrl?: StringNullableFilter<"Resume"> | string | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    applications?: ApplicationsListRelationFilter
  }, "id" | "userId">

  export type ResumeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    website?: SortOrder
    userId?: SortOrder
    educations?: SortOrder
    experiences?: SortOrder
    skills?: SortOrder
    projects?: SortOrder
    resumePdfUrl?: SortOrder
    resumePdfName?: SortOrder
    profileImageUrl?: SortOrder
    _count?: ResumeCountOrderByAggregateInput
    _max?: ResumeMaxOrderByAggregateInput
    _min?: ResumeMinOrderByAggregateInput
  }

  export type ResumeScalarWhereWithAggregatesInput = {
    AND?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    OR?: ResumeScalarWhereWithAggregatesInput[]
    NOT?: ResumeScalarWhereWithAggregatesInput | ResumeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Resume"> | string
    title?: StringWithAggregatesFilter<"Resume"> | string
    summary?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    location?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    website?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    userId?: StringWithAggregatesFilter<"Resume"> | string
    educations?: StringNullableListFilter<"Resume">
    experiences?: StringNullableListFilter<"Resume">
    skills?: StringNullableListFilter<"Resume">
    projects?: StringNullableListFilter<"Resume">
    resumePdfUrl?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    resumePdfName?: StringNullableWithAggregatesFilter<"Resume"> | string | null
    profileImageUrl?: StringNullableWithAggregatesFilter<"Resume"> | string | null
  }

  export type userCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewCreateNestedManyWithoutUserInput
    applied_jobs?: ApplicationsCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewUncheckedCreateNestedManyWithoutUserInput
    applied_jobs?: ApplicationsUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedOneWithoutUserInput
  }

  export type userUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUpdateManyWithoutUserNestedInput
    applied_jobs?: ApplicationsUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUncheckedUpdateManyWithoutUserNestedInput
    applied_jobs?: ApplicationsUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
  }

  export type userUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type userUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type companyCreateInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    jobs?: jobCreateNestedManyWithoutCompanyInput
    review?: reviewCreateNestedManyWithoutCompanyInput
  }

  export type companyUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    jobs?: jobUncheckedCreateNestedManyWithoutCompanyInput
    review?: reviewUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type companyUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    jobs?: jobUpdateManyWithoutCompanyNestedInput
    review?: reviewUpdateManyWithoutCompanyNestedInput
  }

  export type companyUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    jobs?: jobUncheckedUpdateManyWithoutCompanyNestedInput
    review?: reviewUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type companyCreateManyInput = {
    id?: string
    name: string
    description: string
    ownerId: string
  }

  export type companyUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type companyUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
  }

  export type jobCreateInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    lastDate?: Date | string | null
    company: companyCreateNestedOneWithoutJobsInput
    applications?: ApplicationsCreateNestedManyWithoutJobsInput
  }

  export type jobUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    companyId: string
    lastDate?: Date | string | null
    applications?: ApplicationsUncheckedCreateNestedManyWithoutJobsInput
  }

  export type jobUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company?: companyUpdateOneRequiredWithoutJobsNestedInput
    applications?: ApplicationsUpdateManyWithoutJobsNestedInput
  }

  export type jobUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationsUncheckedUpdateManyWithoutJobsNestedInput
  }

  export type jobCreateManyInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    companyId: string
    lastDate?: Date | string | null
  }

  export type jobUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type jobUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewCreateInput = {
    id?: string
    content: string
    user: userCreateNestedOneWithoutReviewInput
    company: companyCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateInput = {
    id?: string
    content: string
    userId: string
    companyId: string
  }

  export type reviewUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutReviewNestedInput
    company?: companyUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateInput = {
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type reviewCreateManyInput = {
    id?: string
    content: string
    userId: string
    companyId: string
  }

  export type reviewUpdateManyMutationInput = {
    content?: StringFieldUpdateOperationsInput | string
  }

  export type reviewUncheckedUpdateManyInput = {
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationsCreateInput = {
    id?: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
    user: userCreateNestedOneWithoutApplied_jobsInput
    jobs: jobCreateNestedOneWithoutApplicationsInput
    Resume?: ResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationsUncheckedCreateInput = {
    id?: string
    user_id: string
    job_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutApplied_jobsNestedInput
    jobs?: jobUpdateOneRequiredWithoutApplicationsNestedInput
    Resume?: ResumeUpdateOneWithoutApplicationsNestedInput
  }

  export type ApplicationsUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsCreateManyInput = {
    id?: string
    user_id: string
    job_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ResumeCreateInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
    user: userCreateNestedOneWithoutResumeInput
    applications?: ApplicationsCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    userId: string
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
    applications?: ApplicationsUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutResumeNestedInput
    applications?: ApplicationsUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: ApplicationsUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type ResumeCreateManyInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    userId: string
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
  }

  export type ResumeUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ResumeUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type ReviewListRelationFilter = {
    every?: reviewWhereInput
    some?: reviewWhereInput
    none?: reviewWhereInput
  }

  export type ApplicationsListRelationFilter = {
    every?: ApplicationsWhereInput
    some?: ApplicationsWhereInput
    none?: ApplicationsWhereInput
  }

  export type ResumeNullableScalarRelationFilter = {
    is?: ResumeWhereInput | null
    isNot?: ResumeWhereInput | null
  }

  export type reviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ApplicationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type JobListRelationFilter = {
    every?: jobWhereInput
    some?: jobWhereInput
    none?: jobWhereInput
  }

  export type jobOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type companyCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
  }

  export type companyMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
  }

  export type companyMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type CompanyScalarRelationFilter = {
    is?: companyWhereInput
    isNot?: companyWhereInput
  }

  export type jobCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    salary?: SortOrder
    employment_type?: SortOrder
    job_type?: SortOrder
    apply_through?: SortOrder
    companyId?: SortOrder
    lastDate?: SortOrder
  }

  export type jobAvgOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type jobMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    salary?: SortOrder
    employment_type?: SortOrder
    job_type?: SortOrder
    apply_through?: SortOrder
    companyId?: SortOrder
    lastDate?: SortOrder
  }

  export type jobMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    location?: SortOrder
    salary?: SortOrder
    employment_type?: SortOrder
    job_type?: SortOrder
    apply_through?: SortOrder
    companyId?: SortOrder
    lastDate?: SortOrder
  }

  export type jobSumOrderByAggregateInput = {
    salary?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type reviewCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
  }

  export type reviewMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
  }

  export type reviewMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    userId?: SortOrder
    companyId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type JobScalarRelationFilter = {
    is?: jobWhereInput
    isNot?: jobWhereInput
  }

  export type ApplicationsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    job_id?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    appliedAt?: SortOrder
    statusNote?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    job_id?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    appliedAt?: SortOrder
    statusNote?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type ApplicationsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    job_id?: SortOrder
    resumeId?: SortOrder
    status?: SortOrder
    appliedAt?: SortOrder
    statusNote?: SortOrder
    notes?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ResumeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    website?: SortOrder
    userId?: SortOrder
    educations?: SortOrder
    experiences?: SortOrder
    skills?: SortOrder
    projects?: SortOrder
    resumePdfUrl?: SortOrder
    resumePdfName?: SortOrder
    profileImageUrl?: SortOrder
  }

  export type ResumeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    website?: SortOrder
    userId?: SortOrder
    resumePdfUrl?: SortOrder
    resumePdfName?: SortOrder
    profileImageUrl?: SortOrder
  }

  export type ResumeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    summary?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    website?: SortOrder
    userId?: SortOrder
    resumePdfUrl?: SortOrder
    resumePdfName?: SortOrder
    profileImageUrl?: SortOrder
  }

  export type reviewCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput> | reviewCreateWithoutUserInput[] | reviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUserInput | reviewCreateOrConnectWithoutUserInput[]
    createMany?: reviewCreateManyUserInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type ApplicationsCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput> | ApplicationsCreateWithoutUserInput[] | ApplicationsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutUserInput | ApplicationsCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationsCreateManyUserInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type ResumeCreateNestedOneWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput
    connect?: ResumeWhereUniqueInput
  }

  export type reviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput> | reviewCreateWithoutUserInput[] | reviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUserInput | reviewCreateOrConnectWithoutUserInput[]
    createMany?: reviewCreateManyUserInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type ApplicationsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput> | ApplicationsCreateWithoutUserInput[] | ApplicationsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutUserInput | ApplicationsCreateOrConnectWithoutUserInput[]
    createMany?: ApplicationsCreateManyUserInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type ResumeUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput
    connect?: ResumeWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type reviewUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput> | reviewCreateWithoutUserInput[] | reviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUserInput | reviewCreateOrConnectWithoutUserInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutUserInput | reviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewCreateManyUserInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutUserInput | reviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutUserInput | reviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type ApplicationsUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput> | ApplicationsCreateWithoutUserInput[] | ApplicationsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutUserInput | ApplicationsCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutUserInput | ApplicationsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationsCreateManyUserInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutUserInput | ApplicationsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutUserInput | ApplicationsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type ResumeUpdateOneWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput
    upsert?: ResumeUpsertWithoutUserInput
    disconnect?: ResumeWhereInput | boolean
    delete?: ResumeWhereInput | boolean
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutUserInput, ResumeUpdateWithoutUserInput>, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type reviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput> | reviewCreateWithoutUserInput[] | reviewUncheckedCreateWithoutUserInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutUserInput | reviewCreateOrConnectWithoutUserInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutUserInput | reviewUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: reviewCreateManyUserInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutUserInput | reviewUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutUserInput | reviewUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type ApplicationsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput> | ApplicationsCreateWithoutUserInput[] | ApplicationsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutUserInput | ApplicationsCreateOrConnectWithoutUserInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutUserInput | ApplicationsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ApplicationsCreateManyUserInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutUserInput | ApplicationsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutUserInput | ApplicationsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type ResumeUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutUserInput
    upsert?: ResumeUpsertWithoutUserInput
    disconnect?: ResumeWhereInput | boolean
    delete?: ResumeWhereInput | boolean
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutUserInput, ResumeUpdateWithoutUserInput>, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type jobCreateNestedManyWithoutCompanyInput = {
    create?: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput> | jobCreateWithoutCompanyInput[] | jobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: jobCreateOrConnectWithoutCompanyInput | jobCreateOrConnectWithoutCompanyInput[]
    createMany?: jobCreateManyCompanyInputEnvelope
    connect?: jobWhereUniqueInput | jobWhereUniqueInput[]
  }

  export type reviewCreateNestedManyWithoutCompanyInput = {
    create?: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput> | reviewCreateWithoutCompanyInput[] | reviewUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCompanyInput | reviewCreateOrConnectWithoutCompanyInput[]
    createMany?: reviewCreateManyCompanyInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type jobUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput> | jobCreateWithoutCompanyInput[] | jobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: jobCreateOrConnectWithoutCompanyInput | jobCreateOrConnectWithoutCompanyInput[]
    createMany?: jobCreateManyCompanyInputEnvelope
    connect?: jobWhereUniqueInput | jobWhereUniqueInput[]
  }

  export type reviewUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput> | reviewCreateWithoutCompanyInput[] | reviewUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCompanyInput | reviewCreateOrConnectWithoutCompanyInput[]
    createMany?: reviewCreateManyCompanyInputEnvelope
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
  }

  export type jobUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput> | jobCreateWithoutCompanyInput[] | jobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: jobCreateOrConnectWithoutCompanyInput | jobCreateOrConnectWithoutCompanyInput[]
    upsert?: jobUpsertWithWhereUniqueWithoutCompanyInput | jobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: jobCreateManyCompanyInputEnvelope
    set?: jobWhereUniqueInput | jobWhereUniqueInput[]
    disconnect?: jobWhereUniqueInput | jobWhereUniqueInput[]
    delete?: jobWhereUniqueInput | jobWhereUniqueInput[]
    connect?: jobWhereUniqueInput | jobWhereUniqueInput[]
    update?: jobUpdateWithWhereUniqueWithoutCompanyInput | jobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: jobUpdateManyWithWhereWithoutCompanyInput | jobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: jobScalarWhereInput | jobScalarWhereInput[]
  }

  export type reviewUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput> | reviewCreateWithoutCompanyInput[] | reviewUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCompanyInput | reviewCreateOrConnectWithoutCompanyInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutCompanyInput | reviewUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: reviewCreateManyCompanyInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutCompanyInput | reviewUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutCompanyInput | reviewUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type jobUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput> | jobCreateWithoutCompanyInput[] | jobUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: jobCreateOrConnectWithoutCompanyInput | jobCreateOrConnectWithoutCompanyInput[]
    upsert?: jobUpsertWithWhereUniqueWithoutCompanyInput | jobUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: jobCreateManyCompanyInputEnvelope
    set?: jobWhereUniqueInput | jobWhereUniqueInput[]
    disconnect?: jobWhereUniqueInput | jobWhereUniqueInput[]
    delete?: jobWhereUniqueInput | jobWhereUniqueInput[]
    connect?: jobWhereUniqueInput | jobWhereUniqueInput[]
    update?: jobUpdateWithWhereUniqueWithoutCompanyInput | jobUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: jobUpdateManyWithWhereWithoutCompanyInput | jobUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: jobScalarWhereInput | jobScalarWhereInput[]
  }

  export type reviewUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput> | reviewCreateWithoutCompanyInput[] | reviewUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: reviewCreateOrConnectWithoutCompanyInput | reviewCreateOrConnectWithoutCompanyInput[]
    upsert?: reviewUpsertWithWhereUniqueWithoutCompanyInput | reviewUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: reviewCreateManyCompanyInputEnvelope
    set?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    disconnect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    delete?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    connect?: reviewWhereUniqueInput | reviewWhereUniqueInput[]
    update?: reviewUpdateWithWhereUniqueWithoutCompanyInput | reviewUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: reviewUpdateManyWithWhereWithoutCompanyInput | reviewUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: reviewScalarWhereInput | reviewScalarWhereInput[]
  }

  export type companyCreateNestedOneWithoutJobsInput = {
    create?: XOR<companyCreateWithoutJobsInput, companyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: companyCreateOrConnectWithoutJobsInput
    connect?: companyWhereUniqueInput
  }

  export type ApplicationsCreateNestedManyWithoutJobsInput = {
    create?: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput> | ApplicationsCreateWithoutJobsInput[] | ApplicationsUncheckedCreateWithoutJobsInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutJobsInput | ApplicationsCreateOrConnectWithoutJobsInput[]
    createMany?: ApplicationsCreateManyJobsInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type ApplicationsUncheckedCreateNestedManyWithoutJobsInput = {
    create?: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput> | ApplicationsCreateWithoutJobsInput[] | ApplicationsUncheckedCreateWithoutJobsInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutJobsInput | ApplicationsCreateOrConnectWithoutJobsInput[]
    createMany?: ApplicationsCreateManyJobsInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type companyUpdateOneRequiredWithoutJobsNestedInput = {
    create?: XOR<companyCreateWithoutJobsInput, companyUncheckedCreateWithoutJobsInput>
    connectOrCreate?: companyCreateOrConnectWithoutJobsInput
    upsert?: companyUpsertWithoutJobsInput
    connect?: companyWhereUniqueInput
    update?: XOR<XOR<companyUpdateToOneWithWhereWithoutJobsInput, companyUpdateWithoutJobsInput>, companyUncheckedUpdateWithoutJobsInput>
  }

  export type ApplicationsUpdateManyWithoutJobsNestedInput = {
    create?: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput> | ApplicationsCreateWithoutJobsInput[] | ApplicationsUncheckedCreateWithoutJobsInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutJobsInput | ApplicationsCreateOrConnectWithoutJobsInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutJobsInput | ApplicationsUpsertWithWhereUniqueWithoutJobsInput[]
    createMany?: ApplicationsCreateManyJobsInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutJobsInput | ApplicationsUpdateWithWhereUniqueWithoutJobsInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutJobsInput | ApplicationsUpdateManyWithWhereWithoutJobsInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type ApplicationsUncheckedUpdateManyWithoutJobsNestedInput = {
    create?: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput> | ApplicationsCreateWithoutJobsInput[] | ApplicationsUncheckedCreateWithoutJobsInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutJobsInput | ApplicationsCreateOrConnectWithoutJobsInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutJobsInput | ApplicationsUpsertWithWhereUniqueWithoutJobsInput[]
    createMany?: ApplicationsCreateManyJobsInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutJobsInput | ApplicationsUpdateWithWhereUniqueWithoutJobsInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutJobsInput | ApplicationsUpdateManyWithWhereWithoutJobsInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type userCreateNestedOneWithoutReviewInput = {
    create?: XOR<userCreateWithoutReviewInput, userUncheckedCreateWithoutReviewInput>
    connectOrCreate?: userCreateOrConnectWithoutReviewInput
    connect?: userWhereUniqueInput
  }

  export type companyCreateNestedOneWithoutReviewInput = {
    create?: XOR<companyCreateWithoutReviewInput, companyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: companyCreateOrConnectWithoutReviewInput
    connect?: companyWhereUniqueInput
  }

  export type userUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<userCreateWithoutReviewInput, userUncheckedCreateWithoutReviewInput>
    connectOrCreate?: userCreateOrConnectWithoutReviewInput
    upsert?: userUpsertWithoutReviewInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutReviewInput, userUpdateWithoutReviewInput>, userUncheckedUpdateWithoutReviewInput>
  }

  export type companyUpdateOneRequiredWithoutReviewNestedInput = {
    create?: XOR<companyCreateWithoutReviewInput, companyUncheckedCreateWithoutReviewInput>
    connectOrCreate?: companyCreateOrConnectWithoutReviewInput
    upsert?: companyUpsertWithoutReviewInput
    connect?: companyWhereUniqueInput
    update?: XOR<XOR<companyUpdateToOneWithWhereWithoutReviewInput, companyUpdateWithoutReviewInput>, companyUncheckedUpdateWithoutReviewInput>
  }

  export type userCreateNestedOneWithoutApplied_jobsInput = {
    create?: XOR<userCreateWithoutApplied_jobsInput, userUncheckedCreateWithoutApplied_jobsInput>
    connectOrCreate?: userCreateOrConnectWithoutApplied_jobsInput
    connect?: userWhereUniqueInput
  }

  export type jobCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<jobCreateWithoutApplicationsInput, jobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: jobCreateOrConnectWithoutApplicationsInput
    connect?: jobWhereUniqueInput
  }

  export type ResumeCreateNestedOneWithoutApplicationsInput = {
    create?: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationsInput
    connect?: ResumeWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type userUpdateOneRequiredWithoutApplied_jobsNestedInput = {
    create?: XOR<userCreateWithoutApplied_jobsInput, userUncheckedCreateWithoutApplied_jobsInput>
    connectOrCreate?: userCreateOrConnectWithoutApplied_jobsInput
    upsert?: userUpsertWithoutApplied_jobsInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutApplied_jobsInput, userUpdateWithoutApplied_jobsInput>, userUncheckedUpdateWithoutApplied_jobsInput>
  }

  export type jobUpdateOneRequiredWithoutApplicationsNestedInput = {
    create?: XOR<jobCreateWithoutApplicationsInput, jobUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: jobCreateOrConnectWithoutApplicationsInput
    upsert?: jobUpsertWithoutApplicationsInput
    connect?: jobWhereUniqueInput
    update?: XOR<XOR<jobUpdateToOneWithWhereWithoutApplicationsInput, jobUpdateWithoutApplicationsInput>, jobUncheckedUpdateWithoutApplicationsInput>
  }

  export type ResumeUpdateOneWithoutApplicationsNestedInput = {
    create?: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    connectOrCreate?: ResumeCreateOrConnectWithoutApplicationsInput
    upsert?: ResumeUpsertWithoutApplicationsInput
    disconnect?: boolean
    delete?: ResumeWhereInput | boolean
    connect?: ResumeWhereUniqueInput
    update?: XOR<XOR<ResumeUpdateToOneWithWhereWithoutApplicationsInput, ResumeUpdateWithoutApplicationsInput>, ResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type ResumeCreateeducationsInput = {
    set: string[]
  }

  export type ResumeCreateexperiencesInput = {
    set: string[]
  }

  export type ResumeCreateskillsInput = {
    set: string[]
  }

  export type ResumeCreateprojectsInput = {
    set: string[]
  }

  export type userCreateNestedOneWithoutResumeInput = {
    create?: XOR<userCreateWithoutResumeInput, userUncheckedCreateWithoutResumeInput>
    connectOrCreate?: userCreateOrConnectWithoutResumeInput
    connect?: userWhereUniqueInput
  }

  export type ApplicationsCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput> | ApplicationsCreateWithoutResumeInput[] | ApplicationsUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutResumeInput | ApplicationsCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationsCreateManyResumeInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type ApplicationsUncheckedCreateNestedManyWithoutResumeInput = {
    create?: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput> | ApplicationsCreateWithoutResumeInput[] | ApplicationsUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutResumeInput | ApplicationsCreateOrConnectWithoutResumeInput[]
    createMany?: ApplicationsCreateManyResumeInputEnvelope
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
  }

  export type ResumeUpdateeducationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ResumeUpdateexperiencesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ResumeUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type ResumeUpdateprojectsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type userUpdateOneRequiredWithoutResumeNestedInput = {
    create?: XOR<userCreateWithoutResumeInput, userUncheckedCreateWithoutResumeInput>
    connectOrCreate?: userCreateOrConnectWithoutResumeInput
    upsert?: userUpsertWithoutResumeInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutResumeInput, userUpdateWithoutResumeInput>, userUncheckedUpdateWithoutResumeInput>
  }

  export type ApplicationsUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput> | ApplicationsCreateWithoutResumeInput[] | ApplicationsUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutResumeInput | ApplicationsCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutResumeInput | ApplicationsUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationsCreateManyResumeInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutResumeInput | ApplicationsUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutResumeInput | ApplicationsUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type ApplicationsUncheckedUpdateManyWithoutResumeNestedInput = {
    create?: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput> | ApplicationsCreateWithoutResumeInput[] | ApplicationsUncheckedCreateWithoutResumeInput[]
    connectOrCreate?: ApplicationsCreateOrConnectWithoutResumeInput | ApplicationsCreateOrConnectWithoutResumeInput[]
    upsert?: ApplicationsUpsertWithWhereUniqueWithoutResumeInput | ApplicationsUpsertWithWhereUniqueWithoutResumeInput[]
    createMany?: ApplicationsCreateManyResumeInputEnvelope
    set?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    disconnect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    delete?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    connect?: ApplicationsWhereUniqueInput | ApplicationsWhereUniqueInput[]
    update?: ApplicationsUpdateWithWhereUniqueWithoutResumeInput | ApplicationsUpdateWithWhereUniqueWithoutResumeInput[]
    updateMany?: ApplicationsUpdateManyWithWhereWithoutResumeInput | ApplicationsUpdateManyWithWhereWithoutResumeInput[]
    deleteMany?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type reviewCreateWithoutUserInput = {
    id?: string
    content: string
    company: companyCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    companyId: string
  }

  export type reviewCreateOrConnectWithoutUserInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput>
  }

  export type reviewCreateManyUserInputEnvelope = {
    data: reviewCreateManyUserInput | reviewCreateManyUserInput[]
  }

  export type ApplicationsCreateWithoutUserInput = {
    id?: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
    jobs: jobCreateNestedOneWithoutApplicationsInput
    Resume?: ResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationsUncheckedCreateWithoutUserInput = {
    id?: string
    job_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsCreateOrConnectWithoutUserInput = {
    where: ApplicationsWhereUniqueInput
    create: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput>
  }

  export type ApplicationsCreateManyUserInputEnvelope = {
    data: ApplicationsCreateManyUserInput | ApplicationsCreateManyUserInput[]
  }

  export type ResumeCreateWithoutUserInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
    applications?: ApplicationsCreateNestedManyWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutUserInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
    applications?: ApplicationsUncheckedCreateNestedManyWithoutResumeInput
  }

  export type ResumeCreateOrConnectWithoutUserInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
  }

  export type reviewUpsertWithWhereUniqueWithoutUserInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutUserInput, reviewUncheckedUpdateWithoutUserInput>
    create: XOR<reviewCreateWithoutUserInput, reviewUncheckedCreateWithoutUserInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutUserInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutUserInput, reviewUncheckedUpdateWithoutUserInput>
  }

  export type reviewUpdateManyWithWhereWithoutUserInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutUserInput>
  }

  export type reviewScalarWhereInput = {
    AND?: reviewScalarWhereInput | reviewScalarWhereInput[]
    OR?: reviewScalarWhereInput[]
    NOT?: reviewScalarWhereInput | reviewScalarWhereInput[]
    id?: StringFilter<"review"> | string
    content?: StringFilter<"review"> | string
    userId?: StringFilter<"review"> | string
    companyId?: StringFilter<"review"> | string
  }

  export type ApplicationsUpsertWithWhereUniqueWithoutUserInput = {
    where: ApplicationsWhereUniqueInput
    update: XOR<ApplicationsUpdateWithoutUserInput, ApplicationsUncheckedUpdateWithoutUserInput>
    create: XOR<ApplicationsCreateWithoutUserInput, ApplicationsUncheckedCreateWithoutUserInput>
  }

  export type ApplicationsUpdateWithWhereUniqueWithoutUserInput = {
    where: ApplicationsWhereUniqueInput
    data: XOR<ApplicationsUpdateWithoutUserInput, ApplicationsUncheckedUpdateWithoutUserInput>
  }

  export type ApplicationsUpdateManyWithWhereWithoutUserInput = {
    where: ApplicationsScalarWhereInput
    data: XOR<ApplicationsUpdateManyMutationInput, ApplicationsUncheckedUpdateManyWithoutUserInput>
  }

  export type ApplicationsScalarWhereInput = {
    AND?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
    OR?: ApplicationsScalarWhereInput[]
    NOT?: ApplicationsScalarWhereInput | ApplicationsScalarWhereInput[]
    id?: StringFilter<"Applications"> | string
    user_id?: StringFilter<"Applications"> | string
    job_id?: StringFilter<"Applications"> | string
    resumeId?: StringNullableFilter<"Applications"> | string | null
    status?: StringFilter<"Applications"> | string
    appliedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
    statusNote?: StringNullableFilter<"Applications"> | string | null
    notes?: StringNullableFilter<"Applications"> | string | null
    updatedAt?: DateTimeNullableFilter<"Applications"> | Date | string | null
  }

  export type ResumeUpsertWithoutUserInput = {
    update: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
    create: XOR<ResumeCreateWithoutUserInput, ResumeUncheckedCreateWithoutUserInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutUserInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutUserInput, ResumeUncheckedUpdateWithoutUserInput>
  }

  export type ResumeUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: ApplicationsUpdateManyWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutUserInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    applications?: ApplicationsUncheckedUpdateManyWithoutResumeNestedInput
  }

  export type jobCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    lastDate?: Date | string | null
    applications?: ApplicationsCreateNestedManyWithoutJobsInput
  }

  export type jobUncheckedCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    lastDate?: Date | string | null
    applications?: ApplicationsUncheckedCreateNestedManyWithoutJobsInput
  }

  export type jobCreateOrConnectWithoutCompanyInput = {
    where: jobWhereUniqueInput
    create: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput>
  }

  export type jobCreateManyCompanyInputEnvelope = {
    data: jobCreateManyCompanyInput | jobCreateManyCompanyInput[]
  }

  export type reviewCreateWithoutCompanyInput = {
    id?: string
    content: string
    user: userCreateNestedOneWithoutReviewInput
  }

  export type reviewUncheckedCreateWithoutCompanyInput = {
    id?: string
    content: string
    userId: string
  }

  export type reviewCreateOrConnectWithoutCompanyInput = {
    where: reviewWhereUniqueInput
    create: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput>
  }

  export type reviewCreateManyCompanyInputEnvelope = {
    data: reviewCreateManyCompanyInput | reviewCreateManyCompanyInput[]
  }

  export type jobUpsertWithWhereUniqueWithoutCompanyInput = {
    where: jobWhereUniqueInput
    update: XOR<jobUpdateWithoutCompanyInput, jobUncheckedUpdateWithoutCompanyInput>
    create: XOR<jobCreateWithoutCompanyInput, jobUncheckedCreateWithoutCompanyInput>
  }

  export type jobUpdateWithWhereUniqueWithoutCompanyInput = {
    where: jobWhereUniqueInput
    data: XOR<jobUpdateWithoutCompanyInput, jobUncheckedUpdateWithoutCompanyInput>
  }

  export type jobUpdateManyWithWhereWithoutCompanyInput = {
    where: jobScalarWhereInput
    data: XOR<jobUpdateManyMutationInput, jobUncheckedUpdateManyWithoutCompanyInput>
  }

  export type jobScalarWhereInput = {
    AND?: jobScalarWhereInput | jobScalarWhereInput[]
    OR?: jobScalarWhereInput[]
    NOT?: jobScalarWhereInput | jobScalarWhereInput[]
    id?: StringFilter<"job"> | string
    title?: StringFilter<"job"> | string
    description?: StringFilter<"job"> | string
    location?: StringFilter<"job"> | string
    salary?: IntFilter<"job"> | number
    employment_type?: StringFilter<"job"> | string
    job_type?: StringFilter<"job"> | string
    apply_through?: StringFilter<"job"> | string
    companyId?: StringFilter<"job"> | string
    lastDate?: DateTimeNullableFilter<"job"> | Date | string | null
  }

  export type reviewUpsertWithWhereUniqueWithoutCompanyInput = {
    where: reviewWhereUniqueInput
    update: XOR<reviewUpdateWithoutCompanyInput, reviewUncheckedUpdateWithoutCompanyInput>
    create: XOR<reviewCreateWithoutCompanyInput, reviewUncheckedCreateWithoutCompanyInput>
  }

  export type reviewUpdateWithWhereUniqueWithoutCompanyInput = {
    where: reviewWhereUniqueInput
    data: XOR<reviewUpdateWithoutCompanyInput, reviewUncheckedUpdateWithoutCompanyInput>
  }

  export type reviewUpdateManyWithWhereWithoutCompanyInput = {
    where: reviewScalarWhereInput
    data: XOR<reviewUpdateManyMutationInput, reviewUncheckedUpdateManyWithoutCompanyInput>
  }

  export type companyCreateWithoutJobsInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    review?: reviewCreateNestedManyWithoutCompanyInput
  }

  export type companyUncheckedCreateWithoutJobsInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    review?: reviewUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type companyCreateOrConnectWithoutJobsInput = {
    where: companyWhereUniqueInput
    create: XOR<companyCreateWithoutJobsInput, companyUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationsCreateWithoutJobsInput = {
    id?: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
    user: userCreateNestedOneWithoutApplied_jobsInput
    Resume?: ResumeCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationsUncheckedCreateWithoutJobsInput = {
    id?: string
    user_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsCreateOrConnectWithoutJobsInput = {
    where: ApplicationsWhereUniqueInput
    create: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationsCreateManyJobsInputEnvelope = {
    data: ApplicationsCreateManyJobsInput | ApplicationsCreateManyJobsInput[]
  }

  export type companyUpsertWithoutJobsInput = {
    update: XOR<companyUpdateWithoutJobsInput, companyUncheckedUpdateWithoutJobsInput>
    create: XOR<companyCreateWithoutJobsInput, companyUncheckedCreateWithoutJobsInput>
    where?: companyWhereInput
  }

  export type companyUpdateToOneWithWhereWithoutJobsInput = {
    where?: companyWhereInput
    data: XOR<companyUpdateWithoutJobsInput, companyUncheckedUpdateWithoutJobsInput>
  }

  export type companyUpdateWithoutJobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    review?: reviewUpdateManyWithoutCompanyNestedInput
  }

  export type companyUncheckedUpdateWithoutJobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    review?: reviewUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type ApplicationsUpsertWithWhereUniqueWithoutJobsInput = {
    where: ApplicationsWhereUniqueInput
    update: XOR<ApplicationsUpdateWithoutJobsInput, ApplicationsUncheckedUpdateWithoutJobsInput>
    create: XOR<ApplicationsCreateWithoutJobsInput, ApplicationsUncheckedCreateWithoutJobsInput>
  }

  export type ApplicationsUpdateWithWhereUniqueWithoutJobsInput = {
    where: ApplicationsWhereUniqueInput
    data: XOR<ApplicationsUpdateWithoutJobsInput, ApplicationsUncheckedUpdateWithoutJobsInput>
  }

  export type ApplicationsUpdateManyWithWhereWithoutJobsInput = {
    where: ApplicationsScalarWhereInput
    data: XOR<ApplicationsUpdateManyMutationInput, ApplicationsUncheckedUpdateManyWithoutJobsInput>
  }

  export type userCreateWithoutReviewInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    applied_jobs?: ApplicationsCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateWithoutReviewInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    applied_jobs?: ApplicationsUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedOneWithoutUserInput
  }

  export type userCreateOrConnectWithoutReviewInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutReviewInput, userUncheckedCreateWithoutReviewInput>
  }

  export type companyCreateWithoutReviewInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    jobs?: jobCreateNestedManyWithoutCompanyInput
  }

  export type companyUncheckedCreateWithoutReviewInput = {
    id?: string
    name: string
    description: string
    ownerId: string
    jobs?: jobUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type companyCreateOrConnectWithoutReviewInput = {
    where: companyWhereUniqueInput
    create: XOR<companyCreateWithoutReviewInput, companyUncheckedCreateWithoutReviewInput>
  }

  export type userUpsertWithoutReviewInput = {
    update: XOR<userUpdateWithoutReviewInput, userUncheckedUpdateWithoutReviewInput>
    create: XOR<userCreateWithoutReviewInput, userUncheckedCreateWithoutReviewInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutReviewInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutReviewInput, userUncheckedUpdateWithoutReviewInput>
  }

  export type userUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    applied_jobs?: ApplicationsUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    applied_jobs?: ApplicationsUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type companyUpsertWithoutReviewInput = {
    update: XOR<companyUpdateWithoutReviewInput, companyUncheckedUpdateWithoutReviewInput>
    create: XOR<companyCreateWithoutReviewInput, companyUncheckedCreateWithoutReviewInput>
    where?: companyWhereInput
  }

  export type companyUpdateToOneWithWhereWithoutReviewInput = {
    where?: companyWhereInput
    data: XOR<companyUpdateWithoutReviewInput, companyUncheckedUpdateWithoutReviewInput>
  }

  export type companyUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    jobs?: jobUpdateManyWithoutCompanyNestedInput
  }

  export type companyUncheckedUpdateWithoutReviewInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    ownerId?: StringFieldUpdateOperationsInput | string
    jobs?: jobUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type userCreateWithoutApplied_jobsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewCreateNestedManyWithoutUserInput
    Resume?: ResumeCreateNestedOneWithoutUserInput
  }

  export type userUncheckedCreateWithoutApplied_jobsInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewUncheckedCreateNestedManyWithoutUserInput
    Resume?: ResumeUncheckedCreateNestedOneWithoutUserInput
  }

  export type userCreateOrConnectWithoutApplied_jobsInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutApplied_jobsInput, userUncheckedCreateWithoutApplied_jobsInput>
  }

  export type jobCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    lastDate?: Date | string | null
    company: companyCreateNestedOneWithoutJobsInput
  }

  export type jobUncheckedCreateWithoutApplicationsInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    companyId: string
    lastDate?: Date | string | null
  }

  export type jobCreateOrConnectWithoutApplicationsInput = {
    where: jobWhereUniqueInput
    create: XOR<jobCreateWithoutApplicationsInput, jobUncheckedCreateWithoutApplicationsInput>
  }

  export type ResumeCreateWithoutApplicationsInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
    user: userCreateNestedOneWithoutResumeInput
  }

  export type ResumeUncheckedCreateWithoutApplicationsInput = {
    id?: string
    title?: string
    summary?: string | null
    phone?: string | null
    location?: string | null
    website?: string | null
    userId: string
    educations?: ResumeCreateeducationsInput | string[]
    experiences?: ResumeCreateexperiencesInput | string[]
    skills?: ResumeCreateskillsInput | string[]
    projects?: ResumeCreateprojectsInput | string[]
    resumePdfUrl?: string | null
    resumePdfName?: string | null
    profileImageUrl?: string | null
  }

  export type ResumeCreateOrConnectWithoutApplicationsInput = {
    where: ResumeWhereUniqueInput
    create: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
  }

  export type userUpsertWithoutApplied_jobsInput = {
    update: XOR<userUpdateWithoutApplied_jobsInput, userUncheckedUpdateWithoutApplied_jobsInput>
    create: XOR<userCreateWithoutApplied_jobsInput, userUncheckedCreateWithoutApplied_jobsInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutApplied_jobsInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutApplied_jobsInput, userUncheckedUpdateWithoutApplied_jobsInput>
  }

  export type userUpdateWithoutApplied_jobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUpdateManyWithoutUserNestedInput
    Resume?: ResumeUpdateOneWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutApplied_jobsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUncheckedUpdateManyWithoutUserNestedInput
    Resume?: ResumeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type jobUpsertWithoutApplicationsInput = {
    update: XOR<jobUpdateWithoutApplicationsInput, jobUncheckedUpdateWithoutApplicationsInput>
    create: XOR<jobCreateWithoutApplicationsInput, jobUncheckedCreateWithoutApplicationsInput>
    where?: jobWhereInput
  }

  export type jobUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: jobWhereInput
    data: XOR<jobUpdateWithoutApplicationsInput, jobUncheckedUpdateWithoutApplicationsInput>
  }

  export type jobUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    company?: companyUpdateOneRequiredWithoutJobsNestedInput
  }

  export type jobUncheckedUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ResumeUpsertWithoutApplicationsInput = {
    update: XOR<ResumeUpdateWithoutApplicationsInput, ResumeUncheckedUpdateWithoutApplicationsInput>
    create: XOR<ResumeCreateWithoutApplicationsInput, ResumeUncheckedCreateWithoutApplicationsInput>
    where?: ResumeWhereInput
  }

  export type ResumeUpdateToOneWithWhereWithoutApplicationsInput = {
    where?: ResumeWhereInput
    data: XOR<ResumeUpdateWithoutApplicationsInput, ResumeUncheckedUpdateWithoutApplicationsInput>
  }

  export type ResumeUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    user?: userUpdateOneRequiredWithoutResumeNestedInput
  }

  export type ResumeUncheckedUpdateWithoutApplicationsInput = {
    title?: StringFieldUpdateOperationsInput | string
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    educations?: ResumeUpdateeducationsInput | string[]
    experiences?: ResumeUpdateexperiencesInput | string[]
    skills?: ResumeUpdateskillsInput | string[]
    projects?: ResumeUpdateprojectsInput | string[]
    resumePdfUrl?: NullableStringFieldUpdateOperationsInput | string | null
    resumePdfName?: NullableStringFieldUpdateOperationsInput | string | null
    profileImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type userCreateWithoutResumeInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewCreateNestedManyWithoutUserInput
    applied_jobs?: ApplicationsCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutResumeInput = {
    id?: string
    name: string
    email: string
    password: string
    role: string
    review?: reviewUncheckedCreateNestedManyWithoutUserInput
    applied_jobs?: ApplicationsUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutResumeInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutResumeInput, userUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationsCreateWithoutResumeInput = {
    id?: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
    user: userCreateNestedOneWithoutApplied_jobsInput
    jobs: jobCreateNestedOneWithoutApplicationsInput
  }

  export type ApplicationsUncheckedCreateWithoutResumeInput = {
    id?: string
    user_id: string
    job_id: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsCreateOrConnectWithoutResumeInput = {
    where: ApplicationsWhereUniqueInput
    create: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationsCreateManyResumeInputEnvelope = {
    data: ApplicationsCreateManyResumeInput | ApplicationsCreateManyResumeInput[]
  }

  export type userUpsertWithoutResumeInput = {
    update: XOR<userUpdateWithoutResumeInput, userUncheckedUpdateWithoutResumeInput>
    create: XOR<userCreateWithoutResumeInput, userUncheckedCreateWithoutResumeInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutResumeInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutResumeInput, userUncheckedUpdateWithoutResumeInput>
  }

  export type userUpdateWithoutResumeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUpdateManyWithoutUserNestedInput
    applied_jobs?: ApplicationsUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutResumeInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    review?: reviewUncheckedUpdateManyWithoutUserNestedInput
    applied_jobs?: ApplicationsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ApplicationsUpsertWithWhereUniqueWithoutResumeInput = {
    where: ApplicationsWhereUniqueInput
    update: XOR<ApplicationsUpdateWithoutResumeInput, ApplicationsUncheckedUpdateWithoutResumeInput>
    create: XOR<ApplicationsCreateWithoutResumeInput, ApplicationsUncheckedCreateWithoutResumeInput>
  }

  export type ApplicationsUpdateWithWhereUniqueWithoutResumeInput = {
    where: ApplicationsWhereUniqueInput
    data: XOR<ApplicationsUpdateWithoutResumeInput, ApplicationsUncheckedUpdateWithoutResumeInput>
  }

  export type ApplicationsUpdateManyWithWhereWithoutResumeInput = {
    where: ApplicationsScalarWhereInput
    data: XOR<ApplicationsUpdateManyMutationInput, ApplicationsUncheckedUpdateManyWithoutResumeInput>
  }

  export type reviewCreateManyUserInput = {
    id?: string
    content: string
    companyId: string
  }

  export type ApplicationsCreateManyUserInput = {
    id?: string
    job_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type reviewUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    company?: companyUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type reviewUncheckedUpdateManyWithoutUserInput = {
    content?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationsUpdateWithoutUserInput = {
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    jobs?: jobUpdateOneRequiredWithoutApplicationsNestedInput
    Resume?: ResumeUpdateOneWithoutApplicationsNestedInput
  }

  export type ApplicationsUncheckedUpdateWithoutUserInput = {
    job_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsUncheckedUpdateManyWithoutUserInput = {
    job_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type jobCreateManyCompanyInput = {
    id?: string
    title: string
    description: string
    location: string
    salary: number
    employment_type: string
    job_type: string
    apply_through: string
    lastDate?: Date | string | null
  }

  export type reviewCreateManyCompanyInput = {
    id?: string
    content: string
    userId: string
  }

  export type jobUpdateWithoutCompanyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationsUpdateManyWithoutJobsNestedInput
  }

  export type jobUncheckedUpdateWithoutCompanyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applications?: ApplicationsUncheckedUpdateManyWithoutJobsNestedInput
  }

  export type jobUncheckedUpdateManyWithoutCompanyInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    location?: StringFieldUpdateOperationsInput | string
    salary?: IntFieldUpdateOperationsInput | number
    employment_type?: StringFieldUpdateOperationsInput | string
    job_type?: StringFieldUpdateOperationsInput | string
    apply_through?: StringFieldUpdateOperationsInput | string
    lastDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type reviewUpdateWithoutCompanyInput = {
    content?: StringFieldUpdateOperationsInput | string
    user?: userUpdateOneRequiredWithoutReviewNestedInput
  }

  export type reviewUncheckedUpdateWithoutCompanyInput = {
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type reviewUncheckedUpdateManyWithoutCompanyInput = {
    content?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ApplicationsCreateManyJobsInput = {
    id?: string
    user_id: string
    resumeId?: string | null
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsUpdateWithoutJobsInput = {
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutApplied_jobsNestedInput
    Resume?: ResumeUpdateOneWithoutApplicationsNestedInput
  }

  export type ApplicationsUncheckedUpdateWithoutJobsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsUncheckedUpdateManyWithoutJobsInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    resumeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsCreateManyResumeInput = {
    id?: string
    user_id: string
    job_id: string
    status?: string
    appliedAt?: Date | string | null
    statusNote?: string | null
    notes?: string | null
    updatedAt?: Date | string | null
  }

  export type ApplicationsUpdateWithoutResumeInput = {
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutApplied_jobsNestedInput
    jobs?: jobUpdateOneRequiredWithoutApplicationsNestedInput
  }

  export type ApplicationsUncheckedUpdateWithoutResumeInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ApplicationsUncheckedUpdateManyWithoutResumeInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    job_id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    appliedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    statusNote?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}