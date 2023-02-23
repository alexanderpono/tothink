import { autoDetect } from '@serialport/bindings-cpp';
import { SerialPort } from 'serialport';

class Program {
    async main() {
        let portS: string = '';
        try {
            portS = await this.getPort();
        } catch (e) {
            console.error('Arduino Not found');
            return;
        }
        console.log('Arduino found at:', portS);

        const port = new SerialPort({
            path: portS,
            baudRate: 9600
        });

        port.on('error', function (err) {
            console.log('Error: ', err.message);
        });

        port.on('readable', function () {
            const dataBuffer = port.read();
            const text = dataBuffer.toString('utf8').trim();
            console.log(text);
        });

        setInterval(() => {
            port.write('255,0,0\n', function (err) {
                if (err) {
                    return console.log('Error on write: ', err.message);
                }
            });
        }, 5000);
    }

    async getPort(): Promise<string> {
        const ports = await autoDetect().list();
        const port = ports.find((port) => /USB/i.test(port.path as string));
        if (!port) {
            console.error('Arduino Not found');
            return Promise.reject(false);
        }
        return port.path;
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
