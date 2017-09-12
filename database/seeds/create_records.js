var db = require('../models');
// db.sequelize.sync()

setTimeout(() => {
  db.Language.create({ code: "RU", language: 'Русский' }).then(() => {
    db.Language.create({ code: "EN", language: 'English' }).then(() => {
      db.Account.create({ domain: 'pmt', name: 'pmt', description: 'pmt description', visCourses: 'A', visShowcase: 'A', autoReg: true, leadingCourse: 1, defLang: 1 }).then(() => {
        db.Author.create({ portrait: 'boris.jpg', account_id: 1 }).then(author => {
          db.Author.create({ portrait: 'moris.jpg', account_id: 1 }).then(author => {
            db.Author_i18n.create({ author_id: 1, firstName: 'Алексей', lastName: 'Константинопольский', translation_language_id: 1 }).then(author => {
              db.Author_i18n.create({ author_id: 1, firstName: 'Alexey', lastName: 'Konstantinopolskiy', translation_language_id: 2 }).then(author => {
                db.Author_i18n.create({ author_id: 2, firstName: 'Морис', lastName: 'Квадраполитичный', translation_language_id: 1 }).then(author => {
                  db.Author_i18n.create({ author_id: 2, firstName: 'Moris', lastName: 'Kvadrapolitichniy', translation_language_id: 2 }).then(author => {
                    db.Course.create({ account_id: 1, language_id: 2, price: '50 \u0024', state: 'P', cover: '/course1.jpg', name: 'Botanical watercolor for beginners.', description: 'Botanical watercolor for beginners.' }).then(course => {
                      db.Course.create({ account_id: 1, language_id: 1, price: '3500 \u20bd', state: 'P', cover: '/course1.jpg', name: 'Ботаническая акварель для начинающих.', description: 'Описание Курса1' }).then(course => {
                        db.Course.create({ account_id: 1, language_id: 2, price: '10 \u0024', state: 'A', cover: '/course2.jpg', name: 'Specialization «Machine learning and data analysis».', description: 'Описание Курса2' }).then(course => {
                          db.Course.create({ account_id: 1, language_id: 1, price: '600 \u20bd', state: 'D', cover: '/course2.jpg', name: 'Специализация «Машинное обучение и анализ данных».', description: 'Описание Курса2' }).then(course => {
                            db.Course.create({ account_id: 1, language_id: 1, price: '3500 \u20bd', state: 'A', cover: '/course3.jpg', name: 'Дополнительное образование персонала по брендингу.', description: 'Описание Курса3' }).then(course => {
                              db.Course.create({ account_id: 1, language_id: 1, price: '3500 \u20bd', state: 'D', cover: '/course4.jpg', name: 'Ботаническая акварель для продвинутых.', description: 'Описание Курса4' }).then(course => {
                                db.Course.create({ account_id: 1, language_id: 1, price: '3500 \u20bd', state: 'D', cover: '/course5.jpg', name: 'Специализация «Актер».', description: 'Описание Курса5' }).then(course => {
                                  db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 1 }).then(authorToCourse => {
                                    db.AuthorToCourse.create({ account_id: 1, author_id: 2, course_id: 1 }).then(authorToCourse => {
                                      db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 2 }).then(authorToCourse => {
                                        db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 3 }).then(authorToCourse => {
                                          db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 4 }).then(authorToCourse => {
                                            db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 5 }).then(authorToCourse => {
                                              db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 6 }).then(authorToCourse => {
                                                db.AuthorToCourse.create({ account_id: 1, author_id: 1, course_id: 7 }).then(authorToCourse => {
                                                  db.Language_i18n.create({ language_id: 1, name: 'Русский', translation_language_id: 1 }).then(lang_i18n => {
                                                    db.Language_i18n.create({ language_id: 1, name: 'Russian', translation_language_id: 2 }).then(lang_i18n => {
                                                      db.Language_i18n.create({ language_id: 2, name: 'Английский', translation_language_id: 1 }).then(lang_i18n => {
                                                        db.Language_i18n.create({ language_id: 2, name: 'English', translation_language_id: 2 }).then(lang_i18n => {
                                                          setTimeout(() => {
                                                            process.exit(1);
                                                          }, 300)
                                                        })
                                                      })
                                                    })
                                                  })
                                                })
                                              })
                                            })
                                          })
                                        })
                                      })
                                    })
                                  })
                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  });
}, 300)
