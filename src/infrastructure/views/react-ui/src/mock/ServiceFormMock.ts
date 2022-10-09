import {
  ImageType,
  VersionType,
} from "src/components/Form/ServiceForm/ServiceForm";

export const mockImages: Array<ImageType> = [
  {
    id: 1,
    name: "PHP",
    versions: [
      { version: "8.1", tags: ["Apache", "CLI"] },
      { version: "7.4", tags: ["Apache", "CLI"] },
      { version: "5.2", tags: ["Apache", "CLI"] },
    ],
    isUtils: false,
  },
  {
    id: 2,
    name: "Node.js",
    versions: [{ version: "15.6", tags: [] }],
    isUtils: false,
  },
  {
    id: 3,
    name: "MySQL",
    versions: [],
    isUtils: false,
  },
  {
    id: 4,
    name: "PHPMyAdmin",
    versions: [],
    isUtils: true,
  },
  {
    id: 5,
    name: "Golang",
    versions: [],
    isUtils: false,
  },
  {
    id: 6,
    name: "PostgreSQL",
    versions: [],
    isUtils: false,
  },
  {
    id: 7,
    name: "MongoDB",
    versions: [],
    isUtils: false,
  },
  {
    id: 8,
    name: "Python",
    versions: [],
    isUtils: false,
  },
];
