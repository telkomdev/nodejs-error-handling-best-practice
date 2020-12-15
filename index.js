// bacaan lanjutan https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

// Membuat custom type Error dengan meng-inheritance Error class ES6
// supaya nantinya bisa di cek dengan builtin function instanceof

// class untuk error handling Insert data
class InsertError extends Error {

    constructor(args) {
        super(args);
        this.name = 'Insert Error';
        this.message = 'Failed Insert user to database';
    }
}

// class untuk error handling membuat connection ke kafka
class KafkaConnectError extends Error {
    
    constructor(args) {
        super(args);
        this.name = 'Kafka Connect Error';
        this.message = 'Failed Connect to Kafka';
    }
}

// class untuk error handling parsing json
class JSONParseError extends Error {
    
    constructor(args) {
        super(args);
        this.name = 'JSON Parse Error';
        this.message = 'Failed parse json data';
    }
}

// class untuk error handling generic error
class GenericError extends Error {
    
    constructor(args) {
        super(args);
        this.name = 'Generic Error';
        this.message = 'Oops server under maintenance';
    }
}

const insertUser = (args) => {
    console.log('insert user');

    throw new InsertError();
};

const kafkaConnect = (args) => {
    console.log('kafka connect');

    throw new KafkaConnectError();
};

const parseKafkaResult = (args) => {
    console.log('parse kafka result');

    throw new KafkaConnectError();
};

const withPromise = (args) => {
    console.log('throwing error with promise');
    return new Promise((resolve, reject) => {
        if (args.operation === 'insert') {
            reject(new InsertError());
        } else if (args.operation === 'kafkaConnect') {
            reject(new KafkaConnectError());
        } else if (args.operation === 'parseJSON') {
            reject(new JSONParseError());
        } else {
            reject(new GenericError())
        }
    });
};

const main = () => {
    try {
        // pilih salah satu fungsi yang akan di eksekusi

        insertUser();
        //kafkaConnect()
        //parseKafkaResult();


    } catch(e) {
        if (e instanceof(InsertError)) {
            // do something with InserError
            console.log(`name : ${e.name}\n message : ${e.message}`);
        } else if (e instanceof(KafkaConnectError)) {
            // do something with KafkaConnectError
            console.log(`name : ${e.name}\n message : ${e.message}`);
        } else if (e instanceof(JSONParseError)) {
             // do something with JSONParseError
             console.log(`name : ${e.name}\n message : ${e.message}`);
        } else {
            console.log('generic message wording');
        }
    }
};

// call main function
main();

console.log('---------------------------------------');

// call withPromise function
withPromise({operation: 'kafkaConnect'})
    .then((data) => console.log(data))
    .catch((e) => {
        if (e instanceof(InsertError)) {
            // do something with InserError
            console.log(`name : ${e.name}\n message : ${e.message}`);
        } else if (e instanceof(KafkaConnectError)) {
            // do something with KafkaConnectError
            console.log(`name : ${e.name}\n message : ${e.message}`);
        } else if (e instanceof(JSONParseError)) {
             // do something with JSONParseError
             console.log(`name : ${e.name}\n message : ${e.message}`);
        } else {
            console.log('generic message wording');
        }
    });