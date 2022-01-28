import React, { useState } from 'react'
import CryptoJS from 'crypto-js';
const Form = () => {
    const [id, changeOutletId] = useState("");
    const [db, changeOutletDb] = useState("");
    const [cipher, changeCipher] = useState("");
    const changeId = (e) => {
        let data=e.target.value
        changeCipher("");
        (isNaN(data) || data==="") ? changeOutletId("") : changeOutletId(parseInt(data));
    }
    const changeDb = (e) => {
        changeCipher("");
        changeOutletDb(e.target.value);
    }
    const encryptData = (msg) => {
        var keySize = 256;
        var salt = CryptoJS.lib.WordArray.random(16);
        var key = CryptoJS.PBKDF2("rjSZEqHprMPrGvLuU1FHXwpkZYDVqbRa", salt, {
            keySize: keySize / 32,
            iterations: 100
        });

        var iv = CryptoJS.lib.WordArray.random(128 / 8);

        var encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));

        return result;
    }
    const generateCipher = () => {
        if (id !== "" && db !== "") {
            const outlet = { id: id, hostDb:{name:db} };
            var data = encryptData(JSON.stringify(outlet));
            changeCipher(data);
            // copyToClipBoard();        
        }
    }
    const reset = () => {
        changeOutletId("");
        changeOutletDb("");
        changeCipher("");
    }
    return (
        <div>
            <div className="modal" id="outlet-detail-modal" tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Generate</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={reset}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body p-3">
                            <form>

                                <div className="form-group">
                                    <label className="control-label">ID</label>
                                    <input className="form-control form-white" type="text" value={id} onChange={changeId} />
                                </div>

                                <div className="form-group">
                                    <label className="control-label">Host Name</label>
                                    <input className="form-control form-white" type="text" value={db} onChange={changeDb} />
                                </div>
                                <div className="form-group">
                                    <label className="control-label">CIPHER</label>
                                    <textarea className="form-control text-area form-white" value={cipher} readOnly rows="5" />
                                </div>
                            </form>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={generateCipher}>Generate</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={reset}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form
