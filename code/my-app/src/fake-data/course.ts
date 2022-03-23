import js from "../common/images/js.jpg";
import css from "../common/images/css.jpg";
import html from "../common/images/html.jpg";
import react from "../common/images/react.jpg";
import angular from "../common/images/angular.png";
import scss from "../common/images/scss.png";
import vue from "../common/images/vue.png";

export interface ICourse {
  id: string | number;
  name: string;
  image: string;
  describe: string;
}

export const courses: Array<ICourse> = [
  {
    id: 1,
    name: "css",
    image: css,
    describe: `Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript. `,
  },
  {
    id: 2,
    name: "js",
    image: js,
    describe: `JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries.`,
  },
  {
    id: 3,
    name: "html",
    image: html,
    describe: `The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser. It can be assisted by technologies such as Cascading Style Sheets and scripting languages such as JavaScript.`,
  },
  {
    id: 4,
    name: "react",
    image: react,
    describe: `React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.`,
  },
  {
    id: 5,
    name: "angular",
    image: angular,
    describe: `Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS.`,
  },
  {
    id: 6,
    name: "scss",
    image: scss,
    describe: `Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets. SassScript is the scripting language itself`,
  },
  {
    id: 7,
    name: "vue",
    image: vue,
    describe: `Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. `,
  },
];

export class CourseModel {
  static getCourses(): Promise<ICourse[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(courses);
      }, 1000);
    });
  }

  static getCourseById(id: string): Promise<ICourse | null> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const course = courses.find((c) => {
          return c.id === id;
        });

        if (!course) {
          return reject(course);
        }

        return resolve(null);
      }, 1000);
    });
  }
}
