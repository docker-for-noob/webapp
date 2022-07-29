import { ImageReference } from "../../imageReference/models/image";

export type ServiceReference = {
    name: string;
    alias?: string;
    image: ImageReference;
}