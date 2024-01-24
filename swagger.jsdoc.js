const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Bootcamp API",
      version: "1.0.0",
      description: "Bootcamp API documentation",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Bootcamp: {
          type: "object",
          required: [
            "name",
            "description",
            "website",
            "phone",
            "email",
            "address",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Bootcamp id",
            },
            name: {
              type: "string",
              description: "Bootcamp name",
            },
            description: {
              type: "string",
              description: "Bootcamp description",
            },
            website: {
              type: "string",
              description: "Bootcamp website",
            },
            phone: {
              type: "string",
              description: "Bootcamp phone",
            },
            email: {
              type: "string",
              description: "Bootcamp email",
            },
            address: {
              type: "string",
              description: "Bootcamp address",
            },
            careers: {
              type: "array",
              items: {
                type: "string",
              },
              description: "Bootcamp careers",
            },
            averageRating: {
              type: "number",
              description: "Bootcamp average rating",
            },
            photo: {
              type: "string",
              description: "Bootcamp photo",
            },
            createdAt: {
              type: "string",
              description: "Bootcamp created at",
            },
          },
          example: {
            _id: "616f427c78d1840016501273",
            name: "Udemy",
            description: "Udemy is an online learning platform",
            website: "https://www.udemy.com/",
            phone: "+123456789",
            email: "<EMAIL>",
            address: "123 Main St, Anytown, USA 12345",
            careers: ["Web Development", "Data Science"],
            averageRating: 4.3,
            photo:
              "https://www.bootcampspot.com/wp-content/uploads/2019/09/udemy.png",
            createdAt: "2021-10-05T17:18:44.000Z",
          },
        },
        Course: {
          type: "object",
          required: [
            "title",
            "description",
            "weeks",
            "tuition",
            "minimumSkill",
            "scholarshipAvailable",
          ],
          properties: {
            _id: {
              type: "string",
              description: "Course id",
            },
            title: {
              type: "string",
              description: "Course title",
            },
            description: {
              type: "string",
              description: "Course description",
            },
            weeks: {
              type: "string",
              description: "Course number of weeks",
            },
            tuition: {
              type: "number",
              description: "Course tuition",
            },
            minimumSkill: {
              type: "string",
              description: "Course minimum skill",
            },
            scholarshipAvailable: {
              type: "boolean",
              description: "Course scholarship available",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Course created at",
            },
            bootcamp: {
              type: "string",
              description: "Course bootcamp",
            },
            user: {
              type: "string",
              description: "Course user",
            },
          },
          example: {
            _id: "616f427c78d1840016501273",
            title: "Node.js",
            description:
              "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
            weeks: "12",
            tuition: 1000,
            minimumSkill: "beginner",
            scholarshipAvailable: false,
            createdAt: "2021-10-05T17:18:44.000Z",
            bootcamp: "616f427c78d1840016501273",
            user: "616f427c78d1840016501273",
          },
        },
        User: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            _id: {
              type: "string",
              description: "User id",
            },
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              description: "User email",
            },
            password: {
              type: "string",
              description: "User password",
            },
            role: {
              type: "string",
              description: "User role",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "User created at",
            },
          },
        },
        Review: {
          type: "object",
          required: ["name", "rating", "comment"],
          properties: {
            _id: {
              type: "string",
              description: "Review id",
            },
            name: {
              type: "string",
              description: "Review name",
            },
            rating: {
              type: "number",
              description: "Review rating",
            },
            comment: {
              type: "string",
              description: "Review comment",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Review created at",
            },
            bootcamp: {
              type: "string",
              description: "Review bootcamp",
            },
            user: {
              type: "string",
              description: "Review user",
            },
          },
          example: {
            _id: "616f427c78d1840016501273",
            name: "John Doe",
            rating: 5,
            comment: "Great bootcamp",
            createdAt: "2021-10-05T17:18:44.000Z",
            bootcamp: "616f427c78d1840016501273",
            user: "616f427c78d1840016501273",
          },
        },
      },
      responses: {
        200: {
          description: "OK",
        },
        400: {
          description: "Bad Request",
        },
        401: {
          description: "Unauthorized",
        },
        404: {
          description: "Not Found",
        },
        500: {
          description: "Internal Server Error",
        },
        502: {
          description: "Bad Gateway",
        },
        503: {
          description: "Service Unavailable",
        },
        504: {
          description: "Gateway Timeout",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
};

module.exports = options;
