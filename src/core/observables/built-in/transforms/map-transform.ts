import {
  CreateSimpleTransform, TCreateSimpleTransformOutValueFunction
} from '../../core/transform/class/functions/create-simple-transform';

export function mapTransform<GValueIn, GValueOut>(mapFunction: (value: GValueIn) => GValueOut) {
  return CreateSimpleTransform<GValueIn, GValueOut>((value: GValueIn, emit: TCreateSimpleTransformOutValueFunction<GValueOut>) => {
    emit(mapFunction(value));
  });
}
