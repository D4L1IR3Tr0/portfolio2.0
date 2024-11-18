        function calculate() {
            const ip = document.getElementById('ip').value;
            let mask = document.getElementById('mask').value;
            const output = document.getElementById('output');

            if (!validateIP(ip)) {
                output.innerHTML = "<p class='error'>Adresse IP invalide.</p>";
                return;
            }

            let cidr, binaryMask = '';
            if (mask.startsWith('/')) {
                cidr = parseInt(mask.slice(1), 10);
                if (isNaN(cidr) || cidr < 0 || cidr > 32) {
                    output.innerHTML = "<p class='error'>CIDR invalide. Il doit être entre 0 et 32.</p>";
                    return;
                }
                binaryMask = '1'.repeat(cidr) + '0'.repeat(32 - cidr);
            } else {
                const maskParts = mask.split('.').map(Number);
                if (maskParts.length !== 4 || maskParts.some(octet => octet < 0 || octet > 255)) {
                    output.innerHTML = "<p class='error'>Masque invalide.</p>";
                    return;
                }
                binaryMask = maskParts.map(octet => octet.toString(2).padStart(8, '0')).join('');
                cidr = binaryMask.split('1').length - 1;
            }

            const ipParts = ip.split('.').map(Number);
            const maskParts = [binaryMask.slice(0, 8), binaryMask.slice(8, 16), binaryMask.slice(16, 24), binaryMask.slice(24)].map(bin => parseInt(bin, 2));

            const network = ipParts.map((part, i) => part & maskParts[i]);
            const invertedMask = maskParts.map(part => 255 - part);
            const broadcast = ipParts.map((part, i) => part | invertedMask[i]);

            const firstUsable = [...network];
            firstUsable[3] += 1;

            const lastUsable = [...broadcast];
            lastUsable[3] -= 1;

            const nbrHosts = Math.pow(2, 32 - cidr) - 2;

            output.innerHTML = `
                <p><strong>Adresse IP :</strong> ${ip}</p>
                <p><strong>Masque :</strong> ${maskParts.join('.')} ou /${cidr}</p>
                <hr>
                <p><strong>Adresse réseau :</strong> ${network.join('.')}</p>
                <p><strong>Adresse de diffusion :</strong> ${broadcast.join('.')}</p>
                <p><strong>Plage d'adresses :</strong> ${firstUsable.join('.')} - ${lastUsable.join('.')}</p>
                <p><strong>Nombre d'hôtes :</strong> ${nbrHosts}</p>
            `;
            // make the .output div visible
            output.style.display = 'block';
        }

        function validateIP(ip) {
            const parts = ip.split('.');
            return parts.length === 4 && parts.every(part => {
                const num = Number(part);
                return num >= 0 && num <= 255;
            });
        }