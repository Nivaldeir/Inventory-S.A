import { Prisma } from '@prisma/client';

type ModelWhereInputMap = {
  Stock: Prisma.StockWhereInput;
  Category: Prisma.CategoryWhereInput;
  StockMovement: Prisma.StockMovementWhereInput;
  Machinery: Prisma.MachineryWhereInput;
  MachineryMovement: Prisma.MachineryMovementWhereInput;
};
type Primitive = string | number | boolean | null;

type Operator =
  | '$eq'
  | '$ne'
  | '$gt'
  | '$gte'
  | '$lt'
  | '$lte'
  | '$in'
  | '$nin'
  | '$like'
  | '$ilike'
  | '$null'
  | '$between'
  | '$contains'
  | '$contained'
  | '$overlap'
  | '$startsWith'
  | '$endsWith';

type Condition = {
  [field: string]: { [key in Operator]?: Primitive | Primitive[] } | Primitive;
};

type LogicalFilter = {
  $or?: Filter[];
  $and?: Filter[];
  $not?: Filter;
};

type Filter = string | Condition | LogicalFilter;

export function applyFilters<T extends keyof ModelWhereInputMap>(
  model: T,
  filter: Filter
): ModelWhereInputMap[T] {
  if (!filter || typeof filter !== 'object') return {} as ModelWhereInputMap[T];

  const prismaFilter: any = {};

  Object.keys(filter).forEach((key) => {
    const value = (filter as any)[key];
    switch (key) {
      case '$or':
        prismaFilter.OR = (value as Filter[]).map((subFilter) =>
          applyFilters(model, subFilter)
        );
        break;
      case '$and':
        prismaFilter.AND = (value as Filter[]).map((subFilter) =>
          applyFilters(model, subFilter)
        );
        break;
      case '$not':
        prismaFilter.NOT = applyFilters(model, value as Filter);
        break;
      default:
        prismaFilter[key] = transformCondition(value);
    }
  });

  return prismaFilter;
}

function transformCondition(condition: any) {
  if (typeof condition !== 'object' || Array.isArray(condition)) {
    return { contains: condition };
  }

  const prismaCondition: Record<string, any> = {};

  Object.entries(condition).forEach(([operator, value]) => {
    switch (operator) {
      case '$eq':
        prismaCondition.equals = value;
        break;
      case '$ne':
        prismaCondition.not = value;
        break;
      case '$gt':
        prismaCondition.gt = value;
        break;
      case '$gte':
        prismaCondition.gte = value;
        break;
      case '$lt':
        prismaCondition.lt = value;
        break;
      case '$lte':
        prismaCondition.lte = value;
        break;
      case '$in':
        prismaCondition.in = value;
        break;
      case '$nin':
        prismaCondition.notIn = value;
        break;
      case '$like':
        prismaCondition.contains = value;
        break;
      case '$ilike':
        prismaCondition.contains = value;
        break;
      case '$null':
        prismaCondition.equals = value ? null : undefined;
        break;
      case '$between':
        if (Array.isArray(value) && value.length === 2) {
          prismaCondition.gte = value[0];
          prismaCondition.lte = value[1];
        }
        break;
      case '$contains':
        prismaCondition.has = value;
        break;
      case '$contained':
        prismaCondition.hasEvery = value;
        break;
      case '$overlap':
        prismaCondition.hasSome = value;
        break;
      case '$startsWith':
        prismaCondition.startsWith = value;
        break;
      case '$endsWith':
        prismaCondition.endsWith = value;
        break;
      default:
        throw new Error(`Operador não suportado: ${operator}`);
    }
  });

  return prismaCondition;
}
