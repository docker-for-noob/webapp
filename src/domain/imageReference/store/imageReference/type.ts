import {ImageReference} from "../../models/image";

export type enhancedImageReference = ImageReference & {
    actualStep: keyof ImageReference
    step: Partial<Record<keyof ImageReference, boolean>>
}