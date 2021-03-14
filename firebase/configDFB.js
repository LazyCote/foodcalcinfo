// Конфиг бд
const firebaseConfig = {
apiKey: "AIzaSyCb3BtWsxjqSFzcYoTeFYFPvny-UUvNN7g",
authDomain: "foodycalc.firebaseapp.com",
databaseURL: "https://foodycalc-default-rtdb.firebaseio.com/",
projectId: "foodycalc",
storageBucket: "foodycalc.appspot.com",
messagingSenderId: "188377998743",
appId: "1:188377998743:web:2ceb1a5ec9347afbecd0d2",
measurementId: "G-QGKBMXPZED"
};
    // Инициализация
    firebase.initializeApp(firebaseConfig);
    // Создание ссылок для обращения
    const auth = firebase.auth();
    const db = firebase.firestore();
    const rt = firebase.database();
  //  console.log(app_fireBase.auth);
    //Что-то чтобы файрбейз не страдал херней в консоли
    db.settings({timestampsInSnapshots:true});
