import { ImageReference } from "../models/image";

const php: ImageReference = {
  id: "GUID",
  name: "php:7.4.30-apache",
  type: "",
  workdir: ["/var/www/html"],
  port: [80],
};
const mysql: ImageReference = {
  id: "GUID",
  name: "mysql:latest",
  type: "",
  workdir: ["var/lib/mysql"],
  port: [3306, 33060],
  env: [
    {
      key: "MYSQL_ROOT_PASSWORD",
      description:
        "This variable is mandatory and specifies the password that will be set for the MySQL root superuser account. In the above example, it was set to my-secret-pw.",
    },
    {
      key: "MYSQL_DATABASE",
      description:
        "This variable is optional and allows you to specify the name of a database to be created on image startup. If a user/password was supplied (see below) then that user will be granted superuser access (corresponding to GRANT ALL) to this database.",
    },
    {
      key: "MYSQL_USER",
      description: "...",
    },
  ],
};

const node: ImageReference = {
  id: "GUID",
  name: "node:latest",
  type: "",
  workdir: ["/var/www/html"],
  port: [],
  env: [],
};

const phpMyAdmin: ImageReference = {
  id: "GUID",
  type: "",
  name: "phpmyadmin/phpmyadmin:latest",
  workdir: ["/var/www/html"],
  port: [80],
};

export const imageReferences: ImageReference[] = [php, mysql, node, phpMyAdmin];
