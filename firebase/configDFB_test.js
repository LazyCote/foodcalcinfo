    // Конфиг бд
    var firebaseConfig = {
        apiKey: "AIzaSyAeZscH7TTLXoIbY2upywzwZNHm5Sxiep0",
        authDomain: "test-2c342.firebaseapp.com",
        databaseURL: "https://test-2c342-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "test-2c342",
        storageBucket: "test-2c342.appspot.com",
        messagingSenderId: "1058859254391",
        appId: "1:1058859254391:web:68b209740ecfe0c59d3c72",
        measurementId: "G-CR8LDP0213"
    };
    // Инициализация
    firebase.initializeApp(firebaseConfig);
    // Создание ссылок для обращения
    const auth = firebase.auth();
    const db = firebase.firestore();
  //  console.log(app_fireBase.auth);
    //Что-то чтобы файрбейз не страдал херней в консоли
    db.settings({timestampsInSnapshots:true});
    console.log(db);
