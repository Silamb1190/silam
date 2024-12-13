const { FTPClient } = require('basic-ftp');

module.exports = async (req, res) => {
    const { server, username, password } = req.body;
    const client = new FTPClient();

    try {
        await client.access({
            host: server,
            user: username,
            password: password
        });

        const files = await client.list('/');
        res.status(200).json(files);
    } catch (error) {
        res.status(500).send('Failed to connect to FTP server');
    } finally {
        client.close();
    }
};
