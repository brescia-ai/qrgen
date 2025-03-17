$(document).ready(function () {
    // Generate initial QR code
    generateQRCode();

    // Generate when button is clicked
    $('#generate-btn').click(function () {
        generateQRCode();
    });

    // Generate when Enter key is pressed in the input field
    $('#text-input').keypress(function (e) {
        if (e.which === 13) {
            generateQRCode();
        }
    });

    // Download QR code
    $('#download-btn').click(function () {
        downloadQRCode();
    });

    function generateQRCode() {
        // Clear previous QR code
        $('#qrcode').empty();

        // Use placeholder value if input is empty
        const text = $('#text-input').val() || 'https://example.com';

        // Generate new QR code
        $('#qrcode').qrcode({
            text: text,
            width: 1000,
            height: 1000
        });
    }

    function downloadQRCode() {
        // Create a temporary canvas to get the image data
        const canvas = document.querySelector('#qrcode canvas');

        if (canvas) {
            // Get the text used to generate the QR code
            const text = $('#text-input').val() || 'https://example.com';
            
            // Create a filename based on the text
            let filename = 'qrcode.png';
            
            if (text.startsWith('http://') || text.startsWith('https://')) {
                // Extract domain from URL
                try {
                    const url = new URL(text);
                    const domain = url.hostname.replace(/[^a-zA-Z0-9]/g, '-');
                    filename = `qr-${domain}.png`;
                } catch (e) {
                    // If URL parsing fails, use a sanitized version of the text
                    filename = `qr-${text.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
                }
            } else {
                // For non-URLs, use a sanitized version of the text
                filename = `qr-${text.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '-')}.png`;
            }

            // Create a temporary link element
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');

            // Trigger download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Please generate a QR code first.');
        }
    }
});
