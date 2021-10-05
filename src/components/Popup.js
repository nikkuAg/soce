import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import './home.css'

export const Popup = (props) => {
    return (
        <>
            {props.show ?
                <div id="popOut">
                    <div id="inner">
                        <Button animated='vertical' onClick={() => props.close(false)}>
                            <Button.Content hidden>Close</Button.Content>
                            <Button.Content visible>
                                <Icon name='close' className="extra" />
                            </Button.Content>
                        </Button>
                        <div id="pragraph2">
                            <h3 id="individual">
                                Minor Modifications for sake of simplicity:
                            </h3>
                            <ul>
                                <li id="individual">Prior to year 2018, there was no separate pool for ‘Female-Only’ therefore ‘Seat Pool’ is not applicable for opening and closing rank of year 2015, 2016 and 2017. However, for these years, ‘Seat Pool’ has been defined as ‘Gender-Neutral’ instead of ‘NA’.</li>
                                <li id="individual">Opening & closing rank of preparatory courses for year 2019 and 2020 have not been included.</li>
                                <li id="individual">In year 2016, 2017 and 2019 some of the opening and closing ranks were Decimal numbers. Same have been converted to nearest integer. </li>
                                <li id="individual">BITS Mesra Ranchi used ‘OS’ quota in year 2016, 2017, 2018 and 2019 which was changed to ‘AI’ quota in 2020</li>
                                <li id="individual">Indian School of Mines Dhanbad changed to IIT Dhanbad in 2017</li>
                                <li id="individual">IIEST has been included in the list of NIT</li>
                            </ul>
                        </div>

                    </div>
                </div>
                : ""}
        </>
    )
}
