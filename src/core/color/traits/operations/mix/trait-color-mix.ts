import { Trait } from '@lifaon/traits';

// // https://www.w3schools.com/sass/sass_functions_color.asp#:~:text=Sass%20Get%20Color%20Functions&text=Returns%20the%20blue%20value%20of,number%20between%200%20and%20255.&text=Returns%20the%20hue%20of%20color%20as%20a%20number%20between%200deg%20and%20255deg.&text=Returns%20the%20HSL%20saturation%20of,between%200%25%20and%20100%25.&text=Returns%20the%20HSL%20lightness%20of,between%200%25%20and%20100%25.

@Trait()
export abstract class TraitColorMix<GSelf, GColor, GReturn> {
  abstract mix(this: GSelf, color: GColor, proportion: number): GReturn;
}


