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
  { id: 'steinitz', name: '\u0412\u0438\u043b\u044c\u0433\u0435\u043b\u044c\u043c \u0421\u0442\u0435\u0439\u043d\u0438\u0446', nameEn: 'Wilhelm Steinitz', years: '1836-1900', reign: '1886-1894', group: 1, video: '/media/movies/Steinitz.mp4', photos: ['/media/screenshots/\u0421\u0442\u0435\u0439\u043d\u0438\u0446/1.PNG','/media/screenshots/\u0421\u0442\u0435\u0439\u043d\u0438\u0446/2.PNG','/media/screenshots/\u0421\u0442\u0435\u0439\u043d\u0438\u0446/3.PNG','/media/screenshots/\u0421\u0442\u0435\u0439\u043d\u0438\u0446/4.PNG'] },
  { id: 'lasker', name: '\u042d\u043c\u0430\u043d\u0443\u044d\u043b\u044c \u041b\u0430\u0441\u043a\u0435\u0440', nameEn: 'Emanuel Lasker', years: '1868-1941', reign: '1894-1921', group: 1, video: '/media/movies/Lasker.mp4', photos: ['/media/screenshots/\u041b\u0430\u0441\u043a\u0435\u0440/1.PNG','/media/screenshots/\u041b\u0430\u0441\u043a\u0435\u0440/2.PNG','/media/screenshots/\u041b\u0430\u0441\u043a\u0435\u0440/3.PNG','/media/screenshots/\u041b\u0430\u0441\u043a\u0435\u0440/4.PNG'] },
  { id: 'capablanca', name: '\u0425\u043e\u0441\u0435 \u041a\u0430\u043f\u0430\u0431\u043b\u0430\u043d\u043a\u0430', nameEn: 'Jose Raul Capablanca', years: '1888-1942', reign: '1921-1927', group: 1, video: '/media/movies/Capablanca.mp4', photos: ['/media/screenshots/\u041a\u0430\u043f\u0430\u0431\u043b\u0430\u043d\u043a\u0430/1.PNG','/media/screenshots/\u041a\u0430\u043f\u0430\u0431\u043b\u0430\u043d\u043a\u0430/2.PNG','/media/screenshots/\u041a\u0430\u043f\u0430\u0431\u043b\u0430\u043d\u043a\u0430/3.PNG','/media/screenshots/\u041a\u0430\u043f\u0430\u0431\u043b\u0430\u043d\u043a\u0430/4.PNG'] },
  { id: 'alekhine', name: '\u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440 \u0410\u043b\u0435\u0445\u0438\u043d', nameEn: 'Alexander Alekhine', years: '1892-1946', reign: '1927-1935, 1937-1946', group: 1, video: '/media/movies/Alekhine.mp4', photos: ['/media/screenshots/\u0410\u043b\u0435\u0445\u0438\u043d/1.PNG','/media/screenshots/\u0410\u043b\u0435\u0445\u0438\u043d/2.PNG','/media/screenshots/\u0410\u043b\u0435\u0445\u0438\u043d/3.PNG','/media/screenshots/\u0410\u043b\u0435\u0445\u0438\u043d/4.PNG','/media/screenshots/\u0410\u043b\u0435\u0445\u0438\u043d/5.PNG'] },
  { id: 'euwe', name: '\u041c\u0430\u043a\u0441 \u042d\u0439\u0432\u0435', nameEn: 'Max Euwe', years: '1901-1981', reign: '1935-1937', group: 1, video: '/media/movies/Euwe.mp4', photos: ['/media/screenshots/\u042d\u0439\u0432\u0435/1.PNG','/media/screenshots/\u042d\u0439\u0432\u0435/2.PNG','/media/screenshots/\u042d\u0439\u0432\u0435/3.PNG','/media/screenshots/\u042d\u0439\u0432\u0435/4.PNG'] },
];

const group2Champions: Champion[] = [
  { id: 'botvinnik', name: '\u041c\u0438\u0445\u0430\u0438\u043b \u0411\u043e\u0442\u0432\u0438\u043d\u043d\u0438\u043a', nameEn: 'Mikhail Botvinnik', years: '1911-1995', reign: '1948-1957, 1958-1960, 1961-1963', group: 2, video: '/media/movies/Botvinnik.mp4', photos: ['/media/screenshots/\u0411\u043e\u0442\u0432\u0438\u043d\u043d\u0438\u043a/1.PNG','/media/screenshots/\u0411\u043e\u0442\u0432\u0438\u043d\u043d\u0438\u043a/2.PNG','/media/screenshots/\u0411\u043e\u0442\u0432\u0438\u043d\u043d\u0438\u043a/3.PNG','/media/screenshots/\u0411\u043e\u0442\u0432\u0438\u043d\u043d\u0438\u043a/4.PNG'] },
  { id: 'smyslov', name: '\u0412\u0430\u0441\u0438\u043b\u0438\u0439 \u0421\u043c\u044b\u0441\u043b\u043e\u0432', nameEn: 'Vasily Smyslov', years: '1921-2010', reign: '1957-1958', group: 2, video: '/media/movies/Smyslov.mp4', photos: ['/media/screenshots/\u0421\u043c\u044b\u0441\u043b\u043e\u0432/1.PNG','/media/screenshots/\u0421\u043c\u044b\u0441\u043b\u043e\u0432/2.PNG','/media/screenshots/\u0421\u043c\u044b\u0441\u043b\u043e\u0432/3.PNG','/media/screenshots/\u0421\u043c\u044b\u0441\u043b\u043e\u0432/4.PNG'] },
  { id: 'tal', name: '\u041c\u0438\u0445\u0430\u0438\u043b \u0422\u0430\u043b\u044c', nameEn: 'Mikhail Tal', years: '1936-1992', reign: '1960-1961', group: 2, video: '/media/movies/Tal.mp4', photos: ['/media/screenshots/\u0422\u0430\u043b\u044c/1.PNG','/media/screenshots/\u0422\u0430\u043b\u044c/2.PNG','/media/screenshots/\u0422\u0430\u043b\u044c/3.PNG','/media/screenshots/\u0422\u0430\u043b\u044c/4.PNG'] },
  { id: 'petrosian', name: '\u0422\u0438\u0433\u0440\u0430\u043d \u041f\u0435\u0442\u0440\u043e\u0441\u044f\u043d', nameEn: 'Tigran Petrosian', years: '1929-1984', reign: '1963-1969', group: 2, video: '/media/movies/Petrosian.mp4', photos: ['/media/screenshots/\u041f\u0435\u0442\u0440\u043e\u0441\u044f\u043d/1.PNG','/media/screenshots/\u041f\u0435\u0442\u0440\u043e\u0441\u044f\u043d/2.PNG','/media/screenshots/\u041f\u0435\u0442\u0440\u043e\u0441\u044f\u043d/3.PNG','/media/screenshots/\u041f\u0435\u0442\u0440\u043e\u0441\u044f\u043d/4.PNG'] },
  { id: 'spassky', name: '\u0411\u043e\u0440\u0438\u0441 \u0421\u043f\u0430\u0441\u0441\u043a\u0438\u0439', nameEn: 'Boris Spassky', years: '1937-', reign: '1969-1972', group: 2, video: '/media/movies/Spassky.mp4', photos: ['/media/screenshots/\u0421\u043f\u0430\u0441\u0441\u043a\u0438\u0439/1.PNG','/media/screenshots/\u0421\u043f\u0430\u0441\u0441\u043a\u0438\u0439/2.PNG','/media/screenshots/\u0421\u043f\u0430\u0441\u0441\u043a\u0438\u0439/3.PNG','/media/screenshots/\u0421\u043f\u0430\u0441\u0441\u043a\u0438\u0439/4.PNG'] },
  { id: 'fisher', name: '\u0420\u043e\u0431\u0435\u0440\u0442 \u0424\u0438\u0448\u0435\u0440', nameEn: 'Bobby Fischer', years: '1943-2008', reign: '1972-1975', group: 2, video: '/media/movies/Fisher.mp4', photos: ['/media/screenshots/\u0424\u0438\u0448\u0435\u0440/1.PNG','/media/screenshots/\u0424\u0438\u0448\u0435\u0440/2.PNG','/media/screenshots/\u0424\u0438\u0448\u0435\u0440/3.PNG','/media/screenshots/\u0424\u0438\u0448\u0435\u0440/4.PNG'] },
];

const group3Champions: Champion[] = [
  { id: 'karpov', name: '\u0410\u043d\u0430\u0442\u043e\u043b\u0438\u0439 \u041a\u0430\u0440\u043f\u043e\u0432', nameEn: 'Anatoly Karpov', years: '1951-', reign: '1975-1985', group: 3, video: '/media/movies/Karpov.mp4', photos: ['/media/screenshots/\u041a\u0430\u0440\u043f\u043e\u0432/1.PNG','/media/screenshots/\u041a\u0430\u0440\u043f\u043e\u0432/2.PNG','/media/screenshots/\u041a\u0430\u0440\u043f\u043e\u0432/3.PNG','/media/screenshots/\u041a\u0430\u0440\u043f\u043e\u0432/4.PNG'] },
  { id: 'kasparov', name: '\u0413\u0430\u0440\u0440\u0438 \u041a\u0430\u0441\u043f\u0430\u0440\u043e\u0432', nameEn: 'Garry Kasparov', years: '1963-', reign: '1985-2000', group: 3, video: '/media/movies/Kasparov.mp4', photos: ['/media/screenshots/\u041a\u0430\u0441\u043f\u0430\u0440\u043e\u0432/1.PNG','/media/screenshots/\u041a\u0430\u0441\u043f\u0430\u0440\u043e\u0432/2.PNG','/media/screenshots/\u041a\u0430\u0441\u043f\u0430\u0440\u043e\u0432/3.PNG','/media/screenshots/\u041a\u0430\u0441\u043f\u0430\u0440\u043e\u0432/4.PNG'] },
  { id: 'kramnik', name: '\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440 \u041a\u0440\u0430\u043c\u043d\u0438\u043a', nameEn: 'Vladimir Kramnik', years: '1975-', reign: '2000-2007', group: 3, video: '/media/movies/Kramnik.mp4', photos: ['/media/screenshots/\u041a\u0440\u0430\u043c\u043d\u0438\u043a/1.PNG','/media/screenshots/\u041a\u0440\u0430\u043c\u043d\u0438\u043a/2.PNG','/media/screenshots/\u041a\u0440\u0430\u043c\u043d\u0438\u043a/3.PNG','/media/screenshots/\u041a\u0440\u0430\u043c\u043d\u0438\u043a/4.PNG'] },
  { id: 'anand', name: '\u0412\u0438\u0448\u0432\u0430\u043d\u0430\u0442\u0430\u043d \u0410\u043d\u0430\u043d\u0434', nameEn: 'Viswanathan Anand', years: '1969-', reign: '2007-2013', group: 3, video: '/media/movies/Anand.mp4', photos: ['/media/screenshots/\u0410\u043d\u0430\u043d\u0434/1.PNG','/media/screenshots/\u0410\u043d\u0430\u043d\u0434/2.PNG','/media/screenshots/\u0410\u043d\u0430\u043d\u0434/3.PNG','/media/screenshots/\u0410\u043d\u0430\u043d\u0434/4.PNG'] },
  { id: 'carlsen', name: '\u041c\u0430\u0433\u043d\u0443\u0441 \u041a\u0430\u0440\u043b\u0441\u0435\u043d', nameEn: 'Magnus Carlsen', years: '1990-', reign: '2013-2023', group: 3, video: '/media/movies/Carlsen.mp4', photos: ['/media/screenshots/\u041a\u0430\u0440\u043b\u0441\u0435\u043d/1.PNG','/media/screenshots/\u041a\u0430\u0440\u043b\u0441\u0435\u043d/2.PNG','/media/screenshots/\u041a\u0430\u0440\u043b\u0441\u0435\u043d/3.PNG','/media/screenshots/\u041a\u0430\u0440\u043b\u0441\u0435\u043d/4.PNG'] },
  { id: 'liren', name: '\u0414\u0438\u043d \u041b\u0438\u0436\u044d\u043d\u044c', nameEn: 'Ding Liren', years: '1992-', reign: '2023-\u043d\u0430\u0441\u0442. \u0432\u0440\u0435\u043c\u044f', group: 3, video: '/media/movies/Ding Liren.mp4', photos: ['/media/screenshots/\u041b\u0438\u0436\u0435\u043d\u044c/1.PNG','/media/screenshots/\u041b\u0438\u0436\u0435\u043d\u044c/2.PNG','/media/screenshots/\u041b\u0438\u0436\u0435\u043d\u044c/3.PNG'] },
];

export const kioskGroups: KioskGroup[] = [
  { id: 1, title: '\u041a\u043b\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043a\u0430\u044f \u044d\u0440\u0430', period: '1886-1946', idleVideo: '/media/movies/V_1.mp4', groupVideo: '/media/movies/Video_G1.mp4', stella: '/media/stella/C\u0422\u0415\u041b\u041b\u0410_1.PNG', champions: group1Champions },
  { id: 2, title: '\u0421\u043e\u0432\u0435\u0442\u0441\u043a\u0430\u044f \u0448\u043a\u043e\u043b\u0430', period: '1948-1972', idleVideo: '/media/movies/V2.mp4', groupVideo: '/media/movies/Video_G2.mp4', stella: '/media/stella/\u0421\u0422\u0415\u041b\u041b\u0410_2.PNG', champions: group2Champions },
  { id: 3, title: '\u0421\u043e\u0432\u0440\u0435\u043c\u0435\u043d\u043d\u0430\u044f \u044d\u0440\u0430', period: '1975-\u043d\u0430\u0441\u0442. \u0432\u0440\u0435\u043c\u044f', idleVideo: '/media/movies/V3.mp4', groupVideo: '/media/movies/Video_G3.mp4', stella: '/media/stella/\u0421\u0422\u0415\u041b\u041b\u0410_3.PNG', champions: group3Champions },
];

