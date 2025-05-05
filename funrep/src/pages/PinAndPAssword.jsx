import React from 'react'

function PinAndPAssword() {
    return (
        <div>
            <div class="container">
                <div class="tbl-container">
                    <table>
                        <tbody><tr>
                            <td class="subheadings" align="center">
                                <div>
                                    <span><input type="submit" name="ctl00$siteDataHolder$btnChangePinPass" value="Change Pin Password" id="siteDataHolder_btnChangePinPass" disabled="disabled" class="aspNetDisabled" /></span>
                                    <span><input type="submit" name="ctl00$siteDataHolder$btnResetData" value="Reset Member ID" id="siteDataHolder_btnResetData" disabled="disabled" class="aspNetDisabled"/></span>
                                </div>
                            </td>
                        </tr>
                            <tr>
                                <td class="title-details">
                                    <table style="width:100%;">
                                        <tbody><tr>
                                            <td align="center" style="width:40%;">Member ID</td>
                                            <td align="center" style="width:20%;">Required</td>
                                            <td align="center" style="width:40%;">Reset Status</td>
                                        </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td class="data">
                                    <div class="ScrollDiv">
                                        <div>
                                            <table cellspacing="0" rules="all" border="1" id="siteDataHolder_grdViewMemberData" style="border-collapse:collapse;">
                                                <tbody><tr class="RowStyle">
                                                    <td align="center" style="width:40%;">
                                                        <span id="siteDataHolder_grdViewMemberData_lblMemberID_0"></span>
                                                    </td><td align="center" style="width:20%;">
                                                        <span id="siteDataHolder_grdViewMemberData_lblMemberRequirement_0"></span>
                                                    </td><td align="center" style="width:40%;">
                                                        <span id="siteDataHolder_grdViewMemberData_lblResetStatus_0"></span>
                                                    </td>
                                                </tr><tr class="FooterRow">
                                                        <td align="center">
                                                            <select name="ctl00$siteDataHolder$grdViewMemberData$ctl03$drpMemberId" id="siteDataHolder_grdViewMemberData_drpMemberId">
                                                                <option value="GK00241724">GK00241724</option>
                                                                <option value="GK00241726">GK00241726</option>
                                                                <option value="GK00241730">GK00241730</option>
                                                                <option value="GK00534884">GK00534884</option>
                                                                <option value="GK00534885">GK00534885</option>
                                                                <option value="GK00534893">GK00534893</option>

                                                            </select>
                                                        </td><td align="center">
                                                            <select name="ctl00$siteDataHolder$grdViewMemberData$ctl03$drpDownListReuirementType" id="siteDataHolder_grdViewMemberData_drpDownListReuirementType" style="width:150px;">
                                                                <option selected="selected" value="0">Need Pin</option>
                                                                <option value="1">Need Password</option>
                                                                <option value="2">Need Both</option>

                                                            </select>
                                                        </td><td align="center">
                                                            <input type="submit" name="ctl00$siteDataHolder$grdViewMemberData$ctl03$btnAddDetails" value="Add Details" id="siteDataHolder_grdViewMemberData_btnAddDetails" class="extraButton" />
                                                        </td>
                                                    </tr>
                                                </tbody></table>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody></table>
                </div>
            </div>
        </div>
    )
}

export default PinAndPAssword