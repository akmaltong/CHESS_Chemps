export interface Champion {
  id: string;
  name: string;
  nameEn: string;
  years: string;
  reign: string;
  group: 1 | 2 | 3;
  video: string;
  photos: string[];
}

export interface KioskGroup {
  id: 1 | 2 | 3;
  title: string;
  period: string;
  idleVideo: string;
  groupVideo: string;
  stella: string;
  champions: Champion[];
}

const group1Champions: Champion[] = [
  { id: 'steinitz', name: '\u0412\u0438\u043b\u044c\u0433\u0435\u043b\u044c\u043c Stejnic', nameEn: 'Wilhelm Steinitz', years: '1836-1900', reign: '1886-1894', group: 1, video: '/media/movies/Steinitz.mp4', photos: ['/media/screenshots/Stejnic/1.jpg','/media/screenshots/Stejnic/2.jpg','/media/screenshots/Stejnic/3.jpg','/media/screenshots/Stejnic/4.jpg'] },
  { id: 'lasker', name: '\u042d\u043c\u0430\u043d\u0443\u044d\u043b\u044c Lasker', nameEn: 'Emanuel Lasker', years: '1868-1941', reign: '1894-1921', group: 1, video: '/media/movies/Lasker.mp4', photos: ['/media/screenshots/Lasker/1.jpg','/media/screenshots/Lasker/2.jpg','/media/screenshots/Lasker/3.jpg','/media/screenshots/Lasker/4.jpg'] },
  { id: 'capablanca', name: '\u0425\u043e\u0441\u0435 Kapablanka', nameEn: 'Jose Raul Capablanca', years: '1888-1942', reign: '1921-1927', group: 1, video: '/media/movies/Capablanca.mp4', photos: ['/media/screenshots/Kapablanka/1.jpg','/media/screenshots/Kapablanka/2.jpg','/media/screenshots/Kapablanka/3.jpg','/media/screenshots/Kapablanka/4.jpg'] },
  { id: 'alekhine', name: '\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440 Alekhin', nameEn: 'Alexander Alekhine', years: '1892-1946', reign: '1927-1935, 1937-1946', group: 1, video: '/media/movies/Alekhine.mp4', photos: ['/media/screenshots/Alekhin/1.jpg','/media/screenshots/Alekhin/2.jpg','/media/screenshots/Alekhin/3.jpg','/media/screenshots/Alekhin/4.jpg','/media/screenshots/Alekhin/5.jpg'] },
  { id: 'euwe', name: '\u041c\u0430\u043a\u0441 Ejve', nameEn: 'Max Euwe', years: '1901-1981', reign: '1935-1937', group: 1, video: '/media/movies/Euwe.mp4', photos: ['/media/screenshots/Ejve/1.jpg','/media/screenshots/Ejve/2.jpg','/media/screenshots/Ejve/3.jpg','/media/screenshots/Ejve/4.jpg'] },
];

const group2Champions: Champion[] = [
  { id: 'botvinnik', name: '\u041c\u0438\u0445\u0430\u0438\u043b Botvinnik', nameEn: 'Mikhail Botvinnik', years: '1911-1995', reign: '1948-1957, 1958-1960, 1961-1963', group: 2, video: '/media/movies/Botvinnik.mp4', photos: ['/media/screenshots/Botvinnik/1.jpg','/media/screenshots/Botvinnik/2.jpg','/media/screenshots/Botvinnik/3.jpg','/media/screenshots/Botvinnik/4.jpg'] },
  { id: 'smyslov', name: '\u0412\u0430\u0441\u0438\u043b\u0438\u0439 Smyslov', nameEn: 'Vasily Smyslov', years: '1921-2010', reign: '1957-1958', group: 2, video: '/media/movies/Smyslov.mp4', photos: ['/media/screenshots/Smyslov/1.jpg','/media/screenshots/Smyslov/2.jpg','/media/screenshots/Smyslov/3.jpg','/media/screenshots/Smyslov/4.jpg'] },
  { id: 'tal', name: '\u041c\u0438\u0445\u0430\u0438\u043b Tal', nameEn: 'Mikhail Tal', years: '1936-1992', reign: '1960-1961', group: 2, video: '/media/movies/Tal.mp4', photos: ['/media/screenshots/Tal/1.jpg','/media/screenshots/Tal/2.jpg','/media/screenshots/Tal/3.jpg','/media/screenshots/Tal/4.jpg'] },
  { id: 'petrosian', name: '\u0422\u0438\u0433\u0440\u0430\u043d Petrosian', nameEn: 'Tigran Petrosian', years: '1929-1984', reign: '1963-1969', group: 2, video: '/media/movies/Petrosian.mp4', photos: ['/media/screenshots/Petrosian/1.jpg','/media/screenshots/Petrosian/2.jpg','/media/screenshots/Petrosian/3.jpg','/media/screenshots/Petrosian/4.jpg'] },
  { id: 'spassky', name: '\u0411\u043e\u0440\u0438\u0441 Spasskij', nameEn: 'Boris Spassky', years: '1937-', reign: '1969-1972', group: 2, video: '/media/movies/Spassky.mp4', photos: ['/media/screenshots/Spasskij/1.jpg','/media/screenshots/Spasskij/2.jpg','/media/screenshots/Spasskij/3.jpg','/media/screenshots/Spasskij/4.jpg'] },
  { id: 'fisher', name: '\u0420\u043e\u0431\u0435\u0440\u0442 Fisher', nameEn: 'Bobby Fischer', years: '1943-2008', reign: '1972-1975', group: 2, video: '/media/movies/Fisher.mp4', photos: ['/media/screenshots/Fisher/1.jpg','/media/screenshots/Fisher/2.jpg','/media/screenshots/Fisher/3.jpg','/media/screenshots/Fisher/4.jpg'] },
];

const group3Champions: Champion[] = [
  { id: 'karpov', name: '\u0410\u043d\u0430\u0442\u043e\u043b\u0438\u0439 Karpov', nameEn: 'Anatoly Karpov', years: '1951-', reign: '1975-1985', group: 3, video: '/media/movies/Karpov.mp4', photos: ['/media/screenshots/Karpov/1.jpg','/media/screenshots/Karpov/2.jpg','/media/screenshots/Karpov/3.jpg','/media/screenshots/Karpov/4.jpg'] },
  { id: 'kasparov', name: '\u0413\u0430\u0440\u0440\u0438 Kasparov', nameEn: 'Garry Kasparov', years: '1963-', reign: '1985-2000', group: 3, video: '/media/movies/Kasparov.mp4', photos: ['/media/screenshots/Kasparov/1.jpg','/media/screenshots/Kasparov/2.jpg','/media/screenshots/Kasparov/3.jpg','/media/screenshots/Kasparov/4.jpg'] },
  { id: 'kramnik', name: '\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440 Kramnik', nameEn: 'Vladimir Kramnik', years: '1975-', reign: '2000-2007', group: 3, video: '/media/movies/Kramnik.mp4', photos: ['/media/screenshots/Kramnik/1.jpg','/media/screenshots/Kramnik/2.jpg','/media/screenshots/Kramnik/3.jpg','/media/screenshots/Kramnik/4.jpg'] },
  { id: 'anand', name: '\u0412\u0438\u0448\u0432\u0430\u043d\u0430\u0442\u0430\u043d Anand', nameEn: 'Viswanathan Anand', years: '1969-', reign: '2007-2013', group: 3, video: '/media/movies/Anand.mp4', photos: ['/media/screenshots/Anand/1.jpg','/media/screenshots/Anand/2.jpg','/media/screenshots/Anand/3.jpg','/media/screenshots/Anand/4.jpg'] },
  { id: 'carlsen', name: '\u041c\u0430\u0433\u043d\u0443\u0441 Karlsen', nameEn: 'Magnus Carlsen', years: '1990-', reign: '2013-2023', group: 3, video: '/media/movies/Carlsen.mp4', photos: ['/media/screenshots/Karlsen/1.jpg','/media/screenshots/Karlsen/2.jpg','/media/screenshots/Karlsen/3.jpg','/media/screenshots/Karlsen/4.jpg'] },
  { id: 'liren', name: '\u0414\u0438\u043d \u041b\u0438\u0436\u044d\u043d\u044c', nameEn: 'Ding Liren', years: '1992-', reign: '2023-\u043d\u0430\u0441\u0442. \u0432\u0440\u0435\u043c\u044f', group: 3, video: '/media/movies/Ding Liren.mp4', photos: ['/media/screenshots/Lizhen/1.jpg','/media/screenshots/Lizhen/2.jpg','/media/screenshots/Lizhen/3.jpg'] },
];

export const kioskGroups: KioskGroup[] = [
  { id: 1, title: '\u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u044d\u0440\u0430', period: '1886-1946', idleVideo: '/media/movies/V_1.mp4', groupVideo: '/media/movies/Video_G1.mp4', stella: '/media/stella/STELLA_1.jpg', champions: group1Champions },
  { id: 2, title: '\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f \u0448\u043a\u043e\u043b\u0430', period: '1948-1972', idleVideo: '/media/movies/V2.mp4', groupVideo: '/media/movies/Video_G2.mp4', stella: '/media/stella/STELLA_2.jpg', champions: group2Champions },
  { id: 3, title: '\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u0430\u044f \u044d\u0440\u0430', period: '1975-\u043d\u0430\u0441\u0442. \u0432\u0440\u0435\u043c\u044f', idleVideo: '/media/movies/V3.mp4', groupVideo: '/media/movies/Video_G3.mp4', stella: '/media/stella/STELLA_3.jpg', champions: group3Champions },
];

