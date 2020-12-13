import { Trait } from '@lifaon/traits';
import { IHSLAObject } from '../../to/to-hsl/trait-color-to-hsla-object';


@Trait()
export abstract class TraitColorFromHSLAObject<GSelf, GReturn> {
  abstract fromHSLAObject(this: GSelf, hslaObject: IHSLAObject): GReturn;
}
