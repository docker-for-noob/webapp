import { ImageReference } from "../../imageReference/models/image";

export type ServiceReference = {
    key: number;
    name: string;
    alias?: string;
    image: ImageReference;
}