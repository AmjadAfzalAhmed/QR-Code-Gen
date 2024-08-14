document.addEventListener('DOMContentLoaded', () => {
    let image = document.getElementById('image');
    let content = document.getElementById('content');
    let btnCreate = document.getElementById('btnCreate');

    btnCreate.onclick = () => {
        if (content.value.trim() === '') {
            alert('Please enter content for the QR code');
            return;
        }
        let linkQR = 'https://api.qrserver.com/v1/create-qr-code/';
        let qrUrl = `${linkQR}?size=500x500&data=${encodeURIComponent(content.value)}`;

        console.log('Requesting QR code with URL:', qrUrl);

        fetch(qrUrl)
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok', response);
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                let objectURL = URL.createObjectURL(blob);
                image.src = objectURL;
                console.log('QR code generated successfully');
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                alert('Failed to generate QR code. Please try again.');
            });
    };
});