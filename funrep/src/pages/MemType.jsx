import React from 'react'

function MemType() {
    return (
        <div>

            <div style={{width:"100%"}}>
                <center>
                    <table style={{width:"100%"}}>
                        <tbody><tr>
                            <td align="center"><h3>Member Types</h3></td>
                        </tr>
                            <tr>
                                <td align="right">
                                    <a id="linkClose" href="/PointTransfer" onclick="window.close();">Close</a>
                                </td>
                            </tr>
                        </tbody></table>
                    <table class="tableStyle" border="1" cellpadding="0" cellspacing="0">
                        <tbody><tr>
                            <td>Particulars</td>
                            <td>Type A</td>
                            <td>Type B</td>
                        </tr>
                            <tr>
                                <td>Membership Fees</td>
                                <td>1000</td>
                                <td>1000</td>
                            </tr>
                            <tr>
                                <td>Free Points</td>
                                <td>0</td>
                                <td>500</td>
                            </tr>
                            <tr>
                                <td>Free Gaming Points</td>
                                <td>0</td>
                                <td>500</td>
                            </tr>
                        </tbody></table>
                </center>
            </div>


        </div>
    )
}

export default MemType;