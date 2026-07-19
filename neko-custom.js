/**
 * Neko.js - Bundled version
 * Copyright (C) 2025 Louis Abraham
 *
 * Based on Neko98 by David Harvey (1998)
 * Original Neko by Masayuki Koba
 *
 * Licensed under GPL v3 (see LICENSE.md)
 */

(function() {
    "use strict";

    // Embedded sprite data (base64-encoded)
    const NEKO_SPRITES = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACJ0lEQVR4nO2dXW6DMBCEocoBOVEfeiIfsJL71MpUpfhnl1nD9z1FEXEIoxl51+AsCwAAAMATWQc/nw3Hmg2T3/5mcy7QCwKIsYwNqzjKRuN4jG9+bjhADAKI8Zq5tFo1f79I758/b24fr8U61jrGd41EHCAGAcTsPGjIamHhtI8Lk1jrwLXAxAFiECBYBJU2t7Lh6hwR3QxGXA2n1xMHiEGAYBFUU4zUHK+Ki/zX8RfQfX1wgBgEmKQQs4omj4jIioj7BStis0IETd4LkizEJ1HhRjv6hhBBN21Hm7AVK1YjsWM1jgc4QAwCiHl1FDJPuwWxhu5riAPEIECACCJSxqEXNCtEkJjQhVgyKpqiFV8lOEAMAogJEUHb/i7lphip6fOMjO8NDhCDAGKURViONEsxfBikCRwgBgHEROkDZUUcqWKnBAeIQQAxUSKoaXWpJqZqii+elAciSE2IXtDgndg1eDxlz35Bd4BZkJiIsyDzAq2j4Dr9XqsiDgeIQQAxESMoe/aF/omOy2KnBAeIQQAxUSIoq9vRV8ZOCQ4QgwAP6AXJN/popbKVbQIOEIMAYry8VlPU5NkeZfXY1gwHiEGAO25f3xoF28Gso3XxfWSxfvCcaUfPChEkJsSifDreUv6y71WBA8QggBgXv1vNNCLgHYk4QAwCiBn1V1ZEzXYQCx5bk1WulHX3iHCAGAS40b+pqlgDn88pOEAMAgAAAAAAAMDyKL4AWY+oiz6fOxwAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABtElEQVR4nO3dQW7DIBRFUai6wKwog67IC6zkzqIociWDwfcD94yryM4TrxhMm9M49sKfz2kAX/QFrM4AYDl4jbxsz99U4vHznUb4XhwBMAOARZkp7LVVU+qjmvD7dwTADAAWYha0/VM773VxZRZ05vM/OAtahRUEu/S0ckXv2U7pNVx8cKvmCIAZAMwAYAYAMwBYnmmdZ8T1IkcAzABWqqBSW6PKirw75giAGQDMWdABZ0ELsYJW3RE7M8N5FO6ItdpBc0dsIVYQLMSmfI8HscgPX+8cATADgIWooA1apva9IFlBs1ZQ9RJ0kAMat31f/hKGGQAsj/jmcysR3qB2BMAMYMYKilw7DevICpqBFQQzAJgBwAwA1v1gVOSZz5nzYr2v2REAM4DZKyhy7US4ZkcAzABm3xEbsYLufGXREQAzAJgBwAwAZgAwA4AZAMwAYAYAMwCYAcA8KX/Ak/ILsYJgnhE75jHVVVhBMPw/SLQ8QV9xLgy/f0cAzABW/fP1FVWwd/hMnCMAZgAwA4AZAMwAYAYAMwCYAcAMAGYAMAOADbFeUrAuNNz9OAJgBiBJkqR0vz/kBG1UpZDEbQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB+0lEQVR4nO3dQW7DIBBGYVP1gJyoi56IA1Zqt17EDQjGD/D71o5i5deMBrDbdKzjt/H6dCzgg76BpzMAWJqkXbxVvn6OFvn781jh97ICYAYASxFt59wurlrB1TWlsdW0uvqu1vsc9dtZATAD2L0FndWU+VlPa6r5bM/92II2YQuChaxWakRPOzVqpqBoVgDMAGAGADMAmAE8aS9ohsln4H6Re0E7sAXBbl19tC52yqCWRS2yalgBMAOA3Vqb1BRU5jjQf8kKgBkALLzWehZlOfj6UZ/tYQXADGD3RxN7Tp1KRyvomWSi93/OrACYATx1IRY9dZTgqWkUKwBmALApngvKFRNLxH7ODCd0VgDMAGBTHBUVaAqagRUAMwDYHW+Tv31xYzbR+z9nVgDMAJ46BbW+n7X6916xAmAG8KQpKPq0q8ScoDkF7cwWBFtmIZYb33wf2I5sQTuzBW26EFtu/+ef07rzFOdzQbuxBcEMAGYAMAOAGQDMAGAGADMAmAHADABmADADgBkAbIqno2vUbGuvuPVtBcAMALZMC8rQnzuLZgXADGDTFpReHWoPbAsp8v+X+VzQg9iCYFNPQbn9EcHo1jecFQAzANh0LSiPezJ5iXZkBcAMADZFC8rxL0RM246sAJgBPOAdsZq9mnQw8PuxAmAGIEmSpON+f4BprMijoYJdAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB70lEQVR4nO3dTW6DMBRF4VCxQFbUQVfEAivRWRtVGDDGHD9zvjGiKU/3yvwlw6tty4FthldgH/QHeDoHABuiVND8+b26wfQ1hj5eJgDmAGDhK6ikjo7sc2P/lxw7EwBzALCuKihVF0dWUO/bnFhZnT6OJgDmAGC3nsW0Zk7UzokV15Koo9S1rN9tTADMAcAeXUEldbSxakrV0SoTAHMAMCtoRe5JX8lJmQmAOQBYtxU0l9XIbUwAzAE8uIKWnI1zr9VEYQJgDqDTO2K79VJSI1MDdXTVDXoTAHMAHa2CTt9Az+UqSJexgoKvgm6rHcrGM0I+mtgDKwh2JkZPq52h5t8yATAHAHMAMAcAcwBBrgV1v/KhmACYA2i4gqydG5gAmAOAjb1eLp7L3oK/jQmAOQBY+AqaM9+Cb+0bBEwAzAHAwldQlEcZU0wAzAFEqKCWI3xEy5/ZBMAcAOwRq6AWnv9JMQEwBxChglpeRbRwSbmECYA5ANhY++31q+5YpRzZf+2XLEqYAJgDgCWzmVsphVWQpbDW8Np5ZwJgDgA2Fv5Qzur3JNc4cZsy6yvKSZkJgDkA2HCiglKriKyTuNrfI7TBVZD+WEGw/3Hc/cWHSpZov/91FRMAcwCwpuK4Y+nxfzYBMAcgSZIkSZIkve7xA3q0i2ime8gTAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACGUlEQVR4nO2dQW7CMBRE4yoH9Im64EQ5YKVULEBpkbET+zPf9nsrFpBARjMaOz9iWQAAAABmJCz9s/d8jb4sDw55EEBMGCl2tu+f5+t4W5fce0r4d5zm1wsHiEGAiSNov/rBszGSIhVTqXNZxBEOEIMAYlxE0FYRKa3aTs25aq4jDhCDAGLyNcCO8HgRb2uTOCpZiKXef4FQ0Oiy0YQDxCDAxBFkSipeSqLpArSgXiGCxHiJoNC6EaWwOOaFfa3n78UBYhBAjJcIcsub1pS9K1dyHBwgBgHEeImgPbefk7K2UavJUnLekkUfDhCDABNH0K6OkSOttq/P3jXDAWIQQEww2vcIrWMnFjQiFTU363GAGAToOYLO7ntYjBRuBQs3i/hqNSOEA8QgwOgR5K2x1MB09IAQQZ1PRw8ZR9FgCjoFDhCDAB1uR1s/mS7B+nHUFDhADAKMshAraTveGlEUxc4RHCAGARy3oFOjdyUQO6/gADEIICZ4ntUZqe2kwAFiEGDW0URvizIVOEAMAswUQcTOKzhADAKMHkHEzntwgBgEcBBBTR6a8EZ0vP9zBAeIQQAx6wesPeQcUStwgBgE6CGCemkUsZPveQQHiEEAMe5WUrFucddF7BzBAWIQQMzqoVHEDttLK3CAGAQQ88f7M0eBChwgBgHE3DOHqBGCA8QggBgEEIMAYhBAzKcb0OW//BsVHCAGARYtv5K3lAOmbJnjAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB6ElEQVR4nO3cQW7DIBCFYVPlgJyoi57IB4xEdpGlmgQwwxvw/61bx8lonvEEZ9sAAAAAAEOFzZ806Xk3+VGfwN1RALHgLWr23+fXf4x/j2WiiQ4QowBiwXPU1JoxmugAMQogFqxjxyJqLkaTqziiA8QogNgtIshzHNEBYhRALNwhdgbHUW6cfnp8OkCMAohlhyerxo6R08/hw2zqjQ4QowBiLVf+JWMnlq2IqkbrJcekA8QowCSroFTTbtbRFO1fq9eGga8RTweIUQDHEdS82rGOiD1zs+PtPEvQAWIUwFkEpU5X/JIdznIebiTpADEKMNs42tuX2nunFZHR+RyjmFmQR0SQ2KN2zlMyqvWwuhgpF30lcUQHiFEAr6sgYmcMOkCMAniKoIabrHB2lR+5CoqdxtE51u+FDhCjAGLTP6ARKyOo5O8toil3TDpAjAKITRNBMdPC3sbRJY7nSQeIUYDVI+joyqpjpdhhHO0IETT5M2Ld7Z1upixWWRePyZfyHhFBd3pSXjWHaVhx9dpmyQMa3hFBq6+Cam+yrKPmw5Psubgw3X5JB4hRgBVXQYWvkVp/4KLExW2Ww9ABYhRAzN3P1zecX6/d3RJ0gBgFEPPSjqlHBE3wPv+hA8QoAAAAAAAAAAAA2/JeEZa6PON8SggAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB20lEQVR4nO3dW26DMBCFYVOxQK+oD1lRFljJfatoC8iXsY/H/N9bKtJARnNkgyEhAAAAAACG2kIIKXM7/JYsvp+P2jfCBgUQ248v3p9fpxvF127SbgtI1v+QDhCjADNFUKanxVE6i+j4qvnq/qMDxCiA2JbTblf+tOFKcZQyRobHl0zEvCKCxO5a52lxlBTHSweIUQCx3NZZKY7S2R9zjuvoZiJWdLx0gBgFEKuJh5Y4av3sWkX73KI0fukAMQqwegRdyTydu6lHOzn733K+iA4QowBiNpd1KmSOoJJFNPUe+bSgA8QogJMIGjaRaVynJNnPFnSAGAVY8XT0SPFiQjf5fv5873SAGAV46kTMyrvDuZ2Rn0sHiFEAMfcRZEU1aqIDxCiAGBHUEVfEHCCCVlkd/QSx/L4w1gXNjggSm24UFDPW24zch97LKekAMQogtvdewuf9SlZvdIAYBZjpkWUjry55iZrYeUREB4hRAA8RZHXBWhVN0WjE1SOO6AAxCjBrBOW0reHp2RQGudp/w/vduFPeEyLIw7Ojb2JntgdxHLUc1+k2ObhT3hkiyMNF+YL3eJNqJ49Wz02iA8QogNhKcdKqNHJNfnmEDhCjAAAAAAAAAAAAAABCP99JWpw0TP40QAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACCElEQVR4nO3dS27EIBBFUYh6gawog16RFxjJmUUowm0wBY/PPeOEOF2qJz622zkAAAAAQFfe6ZyL/T+PfKkvYHcUQMw3igh/N+bx/eMshPer5nrk6AAxCiDmW0TEv1i4jaMrOdcQ/62rn8+8Hgk6QIwCzDwLKo2IzPY/78afPXZidIAYBRCrbc2iWVPOoumwi50YEYQ0IminCBokmrwbCB0gRgHEhoignkaLIzpAjAKIbRdBmXF0tQ9mHll0gBgFEMs60d7EmYrTzEP/2zGvoowOEKMAYkRQ2SzuLJk15UQZHSBGAcQsFxZTLMpCxvZ1zu9a3ZxAB4hRALFW27HyOAoVcVE6PhE0MSJo0YXYX7SF96tbHIWKGY7q9I0OEKMAG+wFJeModgwQF6WsrpkOEKMAm21HJ2cCoeNMaTR0gBgFEJPfmpewTByxEJsAESS21KF8qHjQ42qcFj8fxywdIEYBxEaMIP90gdYoLqwk7ymiA8QogNiIEVSkNFKEiztOxEZEBImNuBfU9D1CPbEXNAEiSGymCHocRz1vTSx9ZxEdIEYBxGaNoKavTYtVjnn7+dIBYhRAbIUIMjnQr3ki/sMsiAgaHREktloEWc2OTL4BhL2gCRBBYtOfiHVm/uwbHSBGAcRWjiA/wwMgdIAYBRBbeSFW8xWNpZ/L4xe90gFiFAAAAACuv1+a+rojmF2mdgAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB8UlEQVR4nO3dTW6DMBRFYahYoFfUQVbEAiPRWYWiECDGPs/mfOPmR7l6VwYDHQZJkqQ7Git8xhLke4T0Q3+BuzMA2Fi6Xubf5+6bpMc03LWmnACYAcDGnNo5Ui850rFqarqynACYAfS+CjprvqjWXuorbB05ATADgJUazUsO0K4SuY6cAJgBwMbStVOzalqsIycAZgA9HohFq50Kp8GXb1/rBMAMAJZ1vren2plX3/9gNb09LX/2FLoTADOAXiooR1qNbc0q++KzLt8NdAJgBgALUUHzxiqixO5YhNpZcwJgBgALUUEl6ijntTVXYk4AzABg4SqoxQO6HE4AzAAar6D/HZ/0mKpdNd0TJwBmALCuVkE1V1Bbf/9yILnsbdA7ATADgBkAzABgBgCbelqNnL3+p7K3ly86ATADgIWroLOuqpQKu2YeiEVkBcGar6DWd9+cAJgB9H6nfM6p3dY334/cEusEwAyg01UQvlmfCl9lvfbhHjFvU43OCrrTs6NzVjjpoiulC/12u5vvW5wAmAHc4FwQviJay/ncD1X2dZU7ATADgIU+HZ2ge8RKVM0WJwBmADDyqYHLXkUcqZGzB1kH36fa7+IEwAwAFqKC1nIe/1X6CYclOAEwA4Dhz06++787dAJgBiBJkiRJkiQNdfwB8KKip/z8lh8AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABxklEQVR4nO3cXWrDMBBFYatkgV5RH7oiL7CQvjolBv9ocmas8721tCHhMhdZit2mmp4bv29TMV/0GxidAcBaxdpZvn/f/sH88yj32ZwAmAHADABmADADgBkAzABgBgAzAJgBwAwAZgAwA4AZAOxl/zbhCVf0a+Jb1k4AzABgLfMJV7QMJ2hOAMwAYG202slWR04AzABgbeTayVBHTgDMAGBR41Wudqg6cgJgBgBLV0HzauQj6uvK60fUkRMAMwBYihOxeaMWetVR9Otf4QTADOBGFdT94mu5UBcR9fLv/Tx7rIicAJgBjLoKyrACWRKsiJwAmAHAUlyI9aqLDLV2lBMAM4CRKiiiIubXLeLTqCpzAmAGACuzClqrssLZwwmAGUDxCoq4t6ui01vTTgDMAIpXUHs3hhX3ZC5e9HkiVpUVdJdV0M6HqR4yB38vqNf/XjmgdwJgBnDHvaBeW8TZRKzunACYAcAe0bWzddJUxbLx/nt9FicAZgCj3iOW4SLrxAXX+kfvEbsDK2ikh3XssXxw+/rESsY75e/GCoKleGriUUfvETvBR5aNwgqC4c9O/tB3kNJ+TicAZgCSJEmSJEmSJE239weuyI+tBxQoUAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB/UlEQVR4nO3dQW7DIBBG4aTKAX2iLnoiDljJ3VUoCq1xgDeG9y0jxXbza0bggn2/cfbC5/fO3+1xnNM+Rp1IrxkAbFipPZd8+vz+/XD7ehy5vpffzT0d517Tdv64nq6/kRUAMwBYsfZHSsfaUdfzUqwAmAHADABmADADWGAi9u8EqqQ0IjoxEWt1Dc1/LysAZgCwEBOxTk63nZGsAJgBwEK3oFTZOiK3mhIrAGYAMAOAGQDMAGAGADMAmAHADABmADADgIVYmhiNSxMXYguCPSKXf+rQpnofv5YVADMAWIh1QVuhLbRqF+8c33VBk7MFwcKNgnLvtKNoo50SKwBmAKu2oAgtInUYcdWyAmAGAAs9CqptFxHaWi0rAGYAK90LyrW6t1PS6fjuEZuNLQh2mVFQ7iojnCOsAJgBXLwF4U8dBDX5260AmAFcvAVVPZlwAnvrNmsFwAxg0onYy2f11No6rws6wXtBs7EFwQwAZgAwA1jgdnSTERHIx9fPzBa06jbVXAowyRr5j/icFQAzAFiInfIbtKTwyBJHW9DkbEGwS77EJ1XuEXvnOL1ZATADgIVoQbkjO9Zr3zUWodWUWAEwA4CRSwj3gQ/KGHmuKlYAzABgBgAzAJgBwMJNxLbOL3SOtpveCoAZACzKXq594PWF2tdmBcAMQJJuy/oBRFOcIGKh6PYAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB50lEQVR4nO3dW27DIBSEYai8QK+oD10RC6zkvqIojQ/mMgf4v8eqSSUfzYgS7IQAAACwoxj2dqmv0VfPN8c9BiAWd66X9P17+ybnz9H1OpIAMQYgFhdbsTyumhovNVV0TUmAGAMQi7PUTmpUI8ZVTSlWQbOigsTiDrVTWU3sBa2MChKLO9eOh2oiAWIMQCxW7sPEUdvCq9YRCRBjALNVUF4Xxm1Yy2tnryMqaFZUkFjV3uxLpVwlkbTUUQ/53/JQdyRAjAGINcv+hzoqfW149/OVaidHAsQYgFiX5UdNzFOjOvJcOzkSIMYAxMb9B/RA6rw68oAEiDEAMdcVtOoWdI4EiDEAxxV0e1andGWy6kqmBgkQYwBiDECMAYgxALGj5vbPHk7DB/SW1dQs+0gkQIwBiB2WI4X/KY2z5feTs4rojQSIMYCZt6M9ry5mQQLEGIBYnPHW0ZFb4j0+BcuRADEG4HgVFN+ddh55n9cpWmX1rp0cCRBjAGJP4jVs+zo1OhHtbeWTIwFiDGDCvaCiB3TU1MhII2snRwLEGIDYiKg1qaPUqMosxyypoI1QQZs9NbHoxLVFzcltVe3kSIAYA9j4wa1XzycxPng2ERW0IypIzMuzo5f8mkILEiDGAAAAAAAAAIAwxh+kg6d3g0jcigAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACEUlEQVR4nO3dQW6DMBCFYag4oE/URU7kA1ai6qpTBGWIsZ/H/N+qiyhRM3pPBgOZJgAAAABAU/MU0zrKd/Gh+FD8YgBic/SqyZ9ft3xQei2e76Wk+nbfkwSIMQCxP7nrxHpWL5u6OOV8/WntlNRdei3r3meRADEGIBZmFZQddeSsLM//fKl2SiqOBIgxALEwFWTdWEe73qidt79HEiDGAMTCH4hl8xr7911VUxsJEGMAYr2sgtaeasGDVdAgqKCBVkFHu0U1dpeGQQLEGEBnFXS1RnZtDoiabaxHRALEGECvqyBnjZxW010b66MiAWIMQGyucU3O1VVNcuxkjXT+xyIBYgwgWgXVro50UHGqaqpROxYJEGMAYnOUXarUcKVUu3YsEiDGAMQefUImHR9UNrtYgQSIMQCxx1VQarjC8SABYgxALEwF5bJbRLuqHYsEiDEAsZ9s7t7Bfdc5mZLXH+nh3NRdSIAYAxBbNrUjuWI51d9Z62rlY5EAMQYgtl1ySOooD3odkQcJEGMAYkNtyqcgKx+LBIgxgAgVZB09EEN1aWIKWDsWCRBjAGJzjUeHldwLlhs+LqwHJECMAUTblL/6WDDP+3iMVDsWCRBjAGL/dcilh2zU+AWKNGjtWCRAjAGIuZYxo56H6QEJEGMAYt1dHZ0eVmskQIwBRD4d/UZFeA7E5ulBSIAYAwAAAMDU3jd/q6NkdOkVaQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACAUlEQVR4nO3dS26EMBBFUTtigV5RBlkRC4xERpFQhIN/xSube0YZpCFNqV5D4SYhAAAAAAAeFcNajtne84f6D3g7CiDmqh17o2b//L59YfraXB0LOkCMAojFVaOmliqa6AAxCiAWPcfObhA1ndE0/HjRAWIUQCz70f/m2HkSHSBGAcRiw2g3vjV2ksEZER0gRgFmiKBzRAxsw+Nq+7MYdRzoADEKMFsEdY5wp44diziiA8QogFhpu1RFxz/RFEZHUDrtyzrWSvZVG0d0gBgFWDGCrKMjiWLnrCGKL481HSBGAd56R2zSC7H4+0P62m5j+c8M7bjaDh0gRgEcR5CruU168MzHIo5y6AAxCiAWe0bQT0ZBchBBhXOeqmNIB4hRADEvSxOnUHJhVXt2RAeIUYDVI2jU3bE9szZJdSZWOMq/jKMzOkCMAohthQ+4CB1rhG5f69nApZjcEfOICBLbRkWEak1O6rhp7gEdIEYBZhtHe5Aq4yhn4KrvZnSAGAWY+QsaJazPUlLlXKhhhfMZEbQaImi21dGd+7jdzm4QdyXbt/jyRQk6QIwCiJVeuYz69L+Mo33QbKdnVJ77fesLUjpAjAKIeXlq4jE6RnIaHjxi+twkOkCMAoh5iaCeOIoz/2cNOkCMAoh5jCCL6LB+AmQzOkCMAgAAAAAAAAAAEJb3A6RFw2NWgh5+AAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB30lEQVR4nO3cQW6DMBCFYahyQJ+oi5yIA1ZyF5UoquJig8dvPPm/VRcNDYzm1RjjZQEAAAAADLXe/HzueKyIjtfnpY8x3wMlFCBQBPU87sz2a7J9fr38hfR87D/TAWIUQOy3F246tlt6Pt5tdJTPYqeEDhCjAFFGQTX/8YPFUW6JndJ1oAPEKED0CAoWR7n3+dIBYhRAbO01/9N6A/KnPT1Hk2nM0gFiFEBstZ7raJV0I6XL0XrnO9MBYhTA8XR00zyPUTTlTnF0+nDcOlpL6AAxChDliZjRk7VFcZM4Eh0gRgHE3EXQhQf9w24SLRYk0AFiFMBZBDW1s3B0kR18hy7oADEKEGUU1HrT1Bod2+RRU0IHiFGAiKujUY8OEKMAYus73OyMxLqgyRBBs60LqkFk/WB19ASIIDGrpX+uIivZr186/bu8oOEUERQ9gryNiFJh2nzwqu8dHSBGAQJF0HTLAluf6PU6F/YLcoQImvyJmOkrq5tBy9eo3Hjk8nGO6AAxCjDzm/J3IqI0P5PaX8qwOM8uc1k150gHiFGA6G/K14xwUl3seNvE487WbTs6QIwCRFkX1HozFWD7si77adMBYhQg0Lqg0rHY4v4fdIAYBQAAAAAAAAAAAACw2PkGN/umTEArtFEAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB8klEQVR4nO3dQW6DMBRFUahYoFfUQVbEAiulswq1dWKD4X7je4ZVFDV9+q8GDJmn/j0LXjNPQX3Qv8DoDAC2gLXQxPr59e/P0+Osj9aWEwAzANhyRu3kaiEnVdZF7ftH5gTADKDzCnrWVMq2OravWQtWMneqnS0nAGYAsKXwAGp+95qSihihUmo5ATADCFZBudO21s5JnACYAXRyIPZ2FZTjauc1JwBmALDQl43WAQ7WnACYAcBCV1CtF1fWwu4dcgJgBgCbqQvxraRGp7gLNwY0ryknAGYAsO4r6Eq/aqpJHTkBMAOAtfyvvvuq2ch15ATADAB2xfmP26+U0oE6cgJgBgAzAJgBwAwA5ioIXhE5ATADgFlBcB05ATADGGlf0JEL6Kng1tceOQEwAxiggnbf3JEGuK3VCYAZACzc7ujUyaPGWnECYAYACzfva+aZQr2o/Z2dAJgBwK6e8Z+DsvRYbr9fqIQTADMAWDfLjNTJeaHaVZwTADMAWJRvlnjuHedWdVT7/rUPns393Z0AmAHAolQQXke5Smn1aP3cHiEnAGYAsFtV0NaRfUe1NVJ7i+72fZwAmAHAhjsXlArqa8eVuN17n5wAmAHAQq+C1pO/j+yCz//2G0mcAJgBwEJX0A0/2x9OAMwAJEmSJEmSpOka31ECkbafkyzAAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACJUlEQVR4nO2dQW7CMBRE44oD+kRdcCIOWIlu04okNrZ538l7S0QDZTTT8Y9dlkVERETkiqQPvMbzBL/DML7GXVpKUACYNDp2Ht8/VT+Y77eXj6+vs/WcGeNIB8AoAEwaHTs7cbG8G1NblLzWDkh86QAYBYBJIxZZvSKlth01XtMIuiJGEMytcZ6Tesx8cmVTamk7EWJnjQ6AUQCYUi9/zKqPAQ0qMjoARgGCRVBtk0kzxE4O1nzW6AAYBYjagrZi4Z+dn0fPuVqrqUUHwCgATOo1Xh4xLm5hKwajNSIdAKMAMHsW7B5HtddpoaSJRYgjHQCjADAp2s33FloWgIVxVDIrq4oyHQCjADDv/OUfGke5YAFV8niv97BmRJvSATAKcPbd0bOTBy/odACMApz9jNiaWaIpf3COpANgFACm6VDVDi8tme+3Uzal5W/k2oJmwgiCIW9KPyPFUW3z6XWjXwfAKAAMvi8mYhx1XKAdftY6AEYBYKJE0HRxVMtWU9IBMApw0lnQFOQAB0l0AIwCwFw6gh6D9xeVoANgFADm0hEUIY50AIwCwEScBeFzodp/idZyGEQHwCgAjC2oQ0y37HfSATAKABO9BSGNqHHn8+H7tAUFwgiCmakFpVeto5ZoN/p1AIwCwMzUgnpR1VIaP6PDLzbSATAKADNTC5qRw+amA2AUAMYI+hwe0IiIEQSjADAKAKMAMFecBdV+ReNQdACMAiwsv8h+rbsWgOYSAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACAklEQVR4nO2dS26EMBQEIZoD+kRZ5EQcMBJZRbEmQ4KxcRle1QqNkAfR6paff8xTX9bseq74vbT9rXumwvab80b8qfygADCPKQbr98Xy/vnyhvTxKI27JugAGAW4aQStF2kTRwfAKABM7+LjcIwsG72XLdLH4xLvSAfAKEDUCMojJWVxURo1pez5r6f4MoLujBEEM0QvaNkRBTW9oNL2jaBAGEEBhqOLYqcnf8RON3QAjALAKACMAsAoQIBC7N8J8dGwEAuEEXTTCGoygb40iqyRZ8d0AIwCRIoge0G/0QEwChCpENtiaTQjVnP/E66OjoIRFHUsaE9xtFQUYqXt9xz/ydEBMAoQtRc0WlGWoB6RDoBRAJghliYOOBxtLygKRhDMEBs0RsBCLChGEIzrgl7guqBAGEF3n5QfrbczWhzpABgFgFEAGAWAUQAYBYBRABgFgDmyc2Gos5dBmrwHHQCjADDz2csLc64yLpQqlk2Wjh3pABgFgKnav1m6CaLn6YitYufs59QBMAoAM0ee7Rph1kwHwCgAzExtQc1JjQq6MwrDnW0efo86AEYBYIbYKT8Vfqaw4bHzrZ7tMDoARgFgehyYXGPh9eSiD5/F0wEwCgCDW7A2dqi9Xa3QATAKAHPJDzqni8dOjg6AUQCY0e27XvS5d6MDYBRARERERKb+fAGjJ5PXY/SGxgAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB9klEQVR4nO2dUW6DMBQEcZUDcqJ+5EQcsBL9a1GFUwzG8xzPfEYORKx29exnkzS1Zc18ng6Mz405Mr7082Z8EDeVXxQA5tHgHj82Xz6/dgfMzwceBRQ6AEYBBoiguysoqkKrgg6AUYBRI2h+Zm+9GwW5CurF9ddIUZNDB8AoAEwKMhGb/hvTIPqMoBExgkaNoCOxM1+IptLv/ommZnGkA2AUYKSJWMtqpxd0AIwCwCgAjALAKABMiLWgaLSclOkAGAWASZEb6EulyHqxBI0/Lx0AowDvHkG9VD5brIIGwggaaSKWY6nUEbvYBdtiR2wUjCCYEE35HFcqqNLr25QfFCNo1Coo2gRthioiHQCjADCtdwSvnSxHp6kROgBGAUaNoOBVUGp1Xx0AowAw7gvawY7YQBhBMDbl4TjSATAKAKMAMAoAowAwCgCjADAKAHPm5EKoV36BVHkOOgBGAWDS3dsLt0TrguW4sm2ydO1IB8AoAMyl85ulhyAivy9ozsTO3b9TB8AoAEx6p709PXbNdACMAsAk6gjqlrnShO6OieHBa55+jjoARgFgQpyUnwr/prDWOkzF33YaHQCjADA9dbHWHl5HX4oOgFEAmLDWHCWOdACMAsCEsuNJ7pigNUMHwCgATCg7VqC7bZM6AEYBRERERGRqzzcHO5R+EWLy8QAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB30lEQVR4nO3cUW7DIBCEYVPlgJyoDzlRDliJvkVVZUqxd5kF/u/RUp0qqxkZjJIOtJTK9XQY+LC4Ca5jAGIP9T8QvXZen1/vi/lp/3WRADEGIEYFNWrHGwkQYwBiu1dQGVg7pws6EiDGAMRM9jMmUM4u3qmdPxZl6R/7SG8kQIwBiK1cQUWxsOrdLyIBYgxAbLUKKorauVNHJECMAYjtvhdkUi936o4EiDEAMSpokNrLfRIgxgDEqCBj7AVNhgoSo4LEizISIMYAxCJWULFe7Hi8fLfa7iYBYgxg4zdi5exihDdZHmpVRgLEGMBmFRTqpbmH3iOLJECMAWxQQa61k50XSr2f2/v9kgAxBrBoBcmfdrLRXlDtnlbfKQkQYwALVZC8dmqctqb5vaAVUEFiEd+ImfN4U2aFBIgxgMkrKOyTz4AtZRMkQIwBTFhBl8/tRJMd9nZ6kQAxBjBJBS35tBPhjBQJEGMAgWO3TO3kgQurXiRAjAGIpTu1M/JMTu78rMi18xMJEGMAYsmqdmqnf0fWkaFhNUUCxBhA1Kegjr9pad7zZXRWx+rJzeP8Tw0JEGMAYr/z6BG35j3z83H5qWn2fSoSIMYAxKLsi5QjFhZiu6CCAAAAAAAAAAA4lvcNif6BTllv/SwAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB90lEQVR4nO3dS26DMBRGYaiyQK+og66IBVaiM+RGMphg6/hxvmEUpRFX969fkHXRlT3x+roU8FXiQ/Q5CwB70V+g9djZvn+PF8NP+ctlB8AsAMwIuoid2uwAmAWAzR5BOxE7MTsAZgFgr5nXczYoduLvYwfALACsyJLqjCOckF4XyrmmRlArjCDYaBG00yOct2hKXV8jqBVGEGyWiVjVqInj7m0Hbb+KIzsAZgFgFgBmAWAWAOYoqKKTEdHBDoBZAJgRdGOpOTXhesIOgFkA2NrRDRGXUieZS8VFTjSdvD++1i5Ht8IImjiC9sbO6hRnBHXACJpsIoZvmue4ey/YyX1klxFvB8AswASjIOSI4FY54jyaOAgjaNAIwkc7ocJa0N2/m8MOgFmABiKo1PNw8NhpLY5yvo8dALMAsH//su+e7O3FVminrODzgo7raQfALAAs2VOZcdTsyOeJJ1GTuUF/sANgFqCliVhOjFDLv2C8fDwhzfkcOwBmAWDvbTHkqKbgTlZxdgDMAsDO2m6YOAqNxU7MDoBZANha46aJFs7/hIZjJ2YHwCwArMtzQaHCL1lQMWUHwCzATKejU7YHMXV3kz31fmrUZAfALMAE94hdtnCINv3vxlHv61R2AMwCwNbeH9BRiROxWRhBkiRJkiRJkiQtw/sDwnmZb6eTiRYAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB6UlEQVR4nO2cW2rDMBQF45IFakX96Iq8wIL7USghsWPJljtX0sxnMCTkcAY9bjLd6rFsvD5VfI/u+KA/wOgYAMx0hYLmz++/F9PX/ar36wIbAGMAvSvoEXX0ig2AMYCRFPSIOvrFBsAYQAAFLZWUVKSgNzoaauNmA2AMoEEFrR47l2onhzTAOZINgDGARhR0eIVTi9SpjmwAjAHA3GsdL1Nqah0bAGMAMAYAYwAwBhBsFYRvuEbDBsAYQOCN2C6Z8z+7z4+MDYAxgMDH0aWjhtVVkzbOmt5c4ucQ6ijbBsAYQMsKapEUbAbJBsAYQMuX8qWrkcgqS9Clvw2AMQCY0KOJ1PnSf+rIBsAYQDAFhVrJpABzR1fryAbAGEAkBUXYKKUA2rlIR6uqtwEwBgDzXKOiFdEWZ36mOgfTzkkF7Z6h2QAYA4DZPE8uvYjPeSayXnJ40kiVm0QbAGMAMM+umDYqtvpMJkuleZ7IHN7M2gAYA4Ahx/SWHldKpZs4GwBjADBRJoWXHnWUc3ZkA2AMACaKgg7rCJwXqvL92gAYAxhMQVVu3LZocUzRBsAYwAAKKvpxx1z41/dntJO5qnE6umdUEEyTV1RzPe3gG1EbAGMAMF1txA6ggkZHBYmIiIiIiIiIiIiI3LrnB7YOmhThCuByAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB4UlEQVR4nO2dTU7DMBgFG8QBfSIWnCgHRAoLBIogATvYmc/2zDKqkkpPb+S/psujHtvJ9aXiM4bjif4Cs2MAMEsLBa0vb18X0+tzq+cNgQ2AMYDRFbRHHf3EBsAYQAAF1ZpA/amgPeroAxsAYwCBFfT9c58cfj5HO5k6mmriZgNgDKATBVVRTSlpgnUkGwBjAD0o6E7tzKYjGwBjADCnM6BSLUTQVI/YABgDiKSgXzbTpRE2AMYAYLI842inHTYAxgCiKijzbI/8ExsAYwCRlqNbbKzXuudab5IYainbBsAYQNQdsVGXl1OwM0g2AMYAgimo6RHEyCRo098GwBgATG7V8LNDqcFEL4KObACMAcBcqddtOkoBzh211pENgDGAmX4p34t27tSRDYAxAJgQO+wpsHZaYwNgDACm1TpH0VJ26lBBtUZENgDGAAYdBR3urA18rHG7qiMbAGMAMOQxve3oYi+joFqjIxsAYwAwIRS0npx8nkFHNgDGAGCi/Fhhu6oj8LxQ0bPOdGQDYAxgMgUVvaGxlJuPKV6eSO7vaQNgDGACBeX8uc/lCjd6Z3WV1/jn3NMGwBgATJdbVGs97bRQsDtiPaGCYIaaiPW4FmYDYAxAREREREREREREROQxPO9kBIt0YBPIPAAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB8UlEQVR4nO2cS26EMBAFIeKAPlEWcyIOGIlsSTQoDv5U21Qto8jD6OmVTBtmWUREMNZlXo4RvvMHfQFPxwBgQtWxpnb2z6+3/5BeW6jvbwNgDADmRx9n1U5kbACMAcDgu4Ae2om28zljA2AMAGaGXdBw2jljA2AMAGYbaIzcek1EUzYAxgBgouwODnqeQ+2abACMATxYQUfUMXJPHdkAGAN4mILCaofSkQ2AMYAHKGg47fTUkQ2AMYBJx9G3tZNONW+hrNbr/xcbAGMAMCFOxNKFFmrpovX6JdgAGAOYSEHVD9P3Al100MtR46bMBsAYwIAKequanHeyou1A9ozrybnO9NpuvxJrA2AMAGalRsolCkoNtNZCiTnjaxsAYwCjKagWtWY71Po3UEERUUEwW+fD+yoq2/veuPlo4syoIBgDgDEAGAOAMQAYA4AxAJgQzwVd0fq5oAjYABgDgDEAGAOAMQCY0LugnjQ6BfsTGwBjADDD/1hHanCz9gtPxGZGBcGEUNCZnrOanEccVdDkqCCYLZoK0/XLDkvBT9bfXqc1NgDGAGCiKChnl3YUzG3erhMBGwBjADDRFVRyAxlKNVfYABgDgBlVQVWI8LyQDYAxAJgo4+i14O/U+lWwATAG8OBd0Ap+dhhsAIwBiIgsj+Ubx9eVGT7eOBMAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB8UlEQVR4nO2dTW6DMBgFoeKAnKiLnMgHrES3rYgjfmzPZzyzjCJE9PRGtmPMNImIYMxTP2wP+A07vugbGB0DgJl70U76/nn7hfW19PR7dtgAGAOAmSOPcFJGOzl61JENgDEAmO5HQb3ryAbAGABM2Gre1ZEKkkOoIJh/Q4WAS80tr4/o2AbAGMDAo6Dt6iSrBtSoyQbAGMBgCgqlnQg6sgEwBjCAgrrQDqUjGwBjAA9VUNfaaakjGwBjADBRlqPf1ryGvmpf/yw2AMYAYEIoaM1ooZQual//DjYAxgAepKDif6ynG7pooJetxKTMBsAYQIcKOvUwReQRSDpwP0fuc30tlx+htQEwBgAzU8vLdxS0VtBaDSUeWb62ATAG0JuCSlFqbYe6/gVUUERUEMzS+M/7IipLbSdubk18MioIxgBgDADGAGAMAMYAYAwAJsS+oBy19wVFwAbAGACMAcAYAIwBjDoKijwyaYkNgDGAUQ/r+EsKMMnyvKBBUUEwIc4LWqER0Yf9Px5ZNgoqCCbEcnTK6OjI929uL5wbHh77FhsAYwAwIRR0VhEXdi/jqslhA2AMACa6gu5MlEKpJocNgDEAmBAKWus8k9UFNgDGAGBCvEFjyk+UjnxOXb8INgDGAGDGHX7s8T1iI6KCRESmYfkFCMmV6gERKCsAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB80lEQVR4nO3dTW6DMBRFYai6QFbUQVfEAivRWYWiOHXwz3nG5xtWqkL1dG8Ag7sskiRJM1qXeI6BjrXYB30As3MAsNAVtH/9/P1w+/4c6W/IZgJgDgA2TAWlPFRTxL/nJRMAcwCw4Sto9DoyATAHAFsb3bcp+YzjagWdjXLhZgJgDuAuFZSqixdVkDqOp7VWUkeRz5RMAMwB3L2CcmyJmqpVO5HryATAHACsZuyq1FFJjVSswW51ZAJgDgCWdZUU2Z5YuO9ZgyVMAMwBwIavoLN3F/Ej1JQJgDkAWIgK2hrXQrTaOTMBMAcAWyM/27N3PKvxXtCkrCBYuAqqJfNhgDNXxGZkBcF6xK7Ks0N7gzMiF+VlBdF6f/N3OzvaBqkjv4RhDgBGPh18XP3FC5XyLitoFlbQxCti640q6zITAHMAsBCL8o027hiCCYA5AFjEzB5X7xdFe+YnhwmAOQAY/qY4eZv6gYvyM7KCJjgLQvaC3hIrYpmbwXY7ZhMAcwA3raCcZ4GOGh9UcaOPd4+5Sh2ZAJgDgIXYrGMrqBHq/a9azxGZAJgDgIW4Hb3nXRxFdnkDWxMAcwCwJnmndkHs8Ppqydna04s4EwBzAHfcvr5W5PfG75RFeA3WBMAcwAT/QaO1NfDx/MsEwByAJEmSJGmZyi9y76cftW4BPwAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB6UlEQVR4nO3bS27DMAxFUTnwArWiDLIiL7CAOzOCIHYk6/Mo6p5hB61Rgg/ULwQAAAAAAADMYun893Yj32HGQ/0Bs6MAs0bQ9vw7fhhfa5g1mugAMQogZiKCzswQTXSAGAUQMx1BidE0dBzRAWIUQGzICPI0KdEBYhRAbLmxdXzndzWLoBuTkqktcTpAjAKMEEGF+zZftY6glG+72BLvFkd0gBgFELvKjaMN42v9GUc9I8UTOkCMAojljS6dxbfJxGvE0QFiFGCQCMqaiBzEzt5rUUYHiFEAscXaIfvWONbe3djjqh5HdIAYBRAzvRCrFSMlPrasq09HdIAYBfAyBaXIjYtYaTpqEV+1piM6QIwCiJlYiLVwFl/W4ogOEKMAXhZiKfeCzqJg6xhfic9ju6EDxCiAWM3t1a+LMgsLqJgZj7mYggZGBIn1uAWc+9AjjHboTwQNjAgSs/KUc1c/3GAKmhQRJNZjM8TUs1Br6AAxCuA0gn5ONR93bG5TbWvX2sqmA8QogKMIylpMnZ1MRdFN6ULcCxoVESSmP5UOuoPywpM1bkd7QASJrZ4eU9SSGIMlC8kjvugAMQoweARVvwtUEhG5i7jW94Uu/u7xf6MDxCjATG/EGlmMfU8KpiAriCAAAAAAQJjKP55spUiYm0SwAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB4klEQVR4nO3cMW7DMAyFYbnIAXWiDj2RD1hA3YIMdhPalB4p/d/YwXFD8IGS5ZQCAAAAAACAVWwltpboXi/5Ut/A6iiA2BY5dvbv3+cf688j+n1fQgeIUQCxLeCU0o4i6NVMcUQHiFEAsS3glNKOrn8mexzRAWIUYJYIuhkL7d01P5ExjugAMQowYwRdiIVmueZMcUQHiFGA2SPon1go3rGTMY7oADEKIHacCZ30jpqM6AAxCjDLE7Es8VKDTUR0gBgFWGkK6hEje5LoO0MHiFEAsdARVEV7RyPRAWIUQOyxwoRTgy2+XtEBYhRgotPRb3WKlGI8p+TFJcroADEKIObWmz0WR7XzQuzmMUiXl1PoADEKsOoUZF1wVadJZkBUmr5TOkCMAoh57oscxpHjCxdht6aJoMSIILERW7OmSenO3o51moqw3U0HiFEAsShPh5piavKKIyIoMSJogYfybVT87QEWZVZ0gBgFmDSCPvlBj+bxQdlPStMBYhRgoggyLabOFkS1c6R4PVnzOu5IB4hRALEQp6P3819fHPa5KnSAGAUQ69Lv2d/tqvYYtC4qn1MTHSBGAZJHkPtZoDsR0eO4Y6fF4PN7owPEKMBKp6MH/A+t5MAUFAURBAAAAAAoS/kDncWcnIjkbz4AAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAB4klEQVR4nO3cQU7rMBSF4RSxwKyIASvKAiuZCaCkqoUd2/1v8P+N3qgEju55ttNkWSRJkiRJL3Vb4kmDr2/051d5oy9gdgYAw0fwsRa2j/vPP5f1873XtY7+/NOcAJgBwA4zGM12rIva1cvT2onGCYAZwMQVlOiKaKy4LpwAmAHAQq+CTtQFXmu1nACYAUxWQSMqIl15ReQEwAwAdplV0N5VVjglnACYAcBCV9C6u2PVUju9PmcEJwBmADADgBkAzABgBgAzAJgBwEJvxLZOm6Zom689JwBmALAQFbQev6VcVSMl5zwtnz+aEwAzgIkf0EiRVinUwxpOAMwAYKGfERvNZ8RkBdGiVFDVVw1Laqpk8xXh9/c/YZgBwEKcBRXWQsu3oPGqyXECYAYACzuaPTdoETZcOU4AzABgocbxFedC0erICYAZAAwfwW8eR4thBU1wFpSC1x96zU4AzAD+aQX9uap5eCFGhEdQa6+5Sx05ATADgN0ibKbWzA302pvvLTfrG6/59N/RCYAZACzETfkt/0r5l/1cihMAMwDYkHnvtdKIoLASazeVv6smJwBmABevoERUzZqphRGvJmt5PDZnf6bkBMAM4OJnQV2OlBs9fX19cK6CorCCJEmSJEnLVL4AA+6MzGVP2PkAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAACEElEQVR4nO3czU3EMBRF4QTRAksaoJpUxIKKUg0NsKQFJLMCzYzimXhi57yMz7dCCIVIT/fK+XGGQZIkSZK0q3GIJzU+v9bHL/JEn0DvHAAMj+BlLczvP38/DtPHc61zbX38u5kAmAOAnWUwmvm8LkpXL4u1E40JgDmAjiso0RWxseKqMAEwBwALvQq6oy7wWitlAmAOoLMKalER6cgrIhMAcwCwEKug6fy28M2KKK2v0uPvyQTAHAAsRAXNK+J/WiO5p1prfh+NCYA5AFiICjqVq44rD9MX5WonWjWZAJgDgO39LkyqUR2vL2+Lf/P1/XnzOLljXuG9oEdmBfW6CoqwAplX1F1rJgDmAGAOAOYAYA6gs1XQuPTgey5cEa25ECtFbdYwATAHAAu9Rywnd6G08WG9e8R6ZAXBolRQlVvW0W41r2ECYA4AFu6h/JCvhS1vQeNVk2MCYA4AFjaaNTd0RLjgyjEBMAcACxXHPbaaRqsjEwBzADA8guQO9wh1ZAJgDqCDe0EpeP2h52wCYA7gQSvo5qrm4oMYd6u456v0nKvUkQmAOQDYGOFiatrwnk9pBUV7p8gEwBwALMRD+blwF3yL/0sxATAHAGuS91orjQhWVmLpReX/qskEwBzAwSsoEVUzZWqhxbeAWnx36PSekgmAOYCD3wuqckt5o8XP1wfnKigKK0iSJEmSNHTlF39Jq88ucU+HAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABiUlEQVR4nO3bS26DMBQF0KTKAllRB10RC6xEZ1EqhWALzDVwzjBKIOLpXfnH7QYAAAAAAAAAAAAAAADAUd3Tf+AAppbP62vrC1JHAcJE0ELsjN+/zw+Hn8fmz04HhClA2L+euvgoZXoXO63pgDAFCHucbJQyVcZRJHZe6YAwBQg7UgRNlXHxGkfdjr50QJgChPWyFjQtfaF2lPK6bjO3ntPimrXPVAeEKcDFIuht1IwzUbAmLuauU3LfPeNIB4QpwAUiqGoCNWwUO3uaizgRdAAiKEwBwhQgTAFOuhwd32nqxOKStQ4IU4ATRdClYmcoWF/6MEF70gFhChDW3ab8WLB71WJ5uXXUzNEBYQoQ1l0ElSjZQav97dx1Noy1t5MyHRCmACfaEWs6ERsabNC33pQv2azXAWEKEHaYUdC40fHC2jNIJmInJ4JOei5ot6XpYcU6TItJX+H3jYJ6IYKudDRxjXGjKKuNrDUnt0uOLOqAMAUI6+UdsdSrpvcd7+tcUI9EEAAAt/39AZQVjGnw2gurAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAABhElEQVR4nO3bW27CMBAF0FCxQFbUj64oC6yU/lURChAHm+sk53wiMJDRXI3zGAYAAAAAAAAAAAAAAAAA9uqS/gGdmj51vL5qL0gZBQi7pn9Aj7Ezfv/+v3j7aXuIdECYAoRdDzClXCqtE6EDwhQgbE8bsanB/1mcfB65m4iqHDsdEKYAYb1MQVPJm59slKa9TWI6IEwBTjYFLUbE+GACmcdL6ZRSa801n31nOtIBYQpwgggq2uy0iIu50nVax5EOCFOAg0ZQJHZSnlw1E0G9E0FhChCmAGEKENbL6eijennKWgeEKcCBImjz5msv1mwSS29r1AFhChDW3RQ0Pmjh0tZufdq5Fh0QpgBh3UXQGhtuI9z82Yqxs7gp0wFhCnCgK2JNN2K3SrHQep3Si/U6IEwBwnYzBY0r2rx0nbnSTV+tR1l1QJgChHV3X1Cp1k+yr4msDe83BfVCBJ3p7uh3jA1OL7/zvaUPg9wRQb0QQWG9Pyk/hf5/i+91X1CPRBAAAMPn/QHQzIkXXVeQ1QAAAABJRU5ErkJggg=="
    ];


  // Animation states (matching original Neko.h enum)
  const NekoState = {
    STOP: 0,
    WASH: 1,
    SCRATCH: 2,
    YAWN: 3,
    SLEEP: 4,
    AWAKE: 5,
    U_MOVE: 6, // Up
    D_MOVE: 7, // Down
    L_MOVE: 8, // Left
    R_MOVE: 9, // Right
    UL_MOVE: 10, // Up-Left
    UR_MOVE: 11, // Up-Right
    DL_MOVE: 12, // Down-Left
    DR_MOVE: 13, // Down-Right
    U_CLAW: 14, // Clawing upward (at top boundary)
    D_CLAW: 15, // Clawing downward (at bottom boundary)
    L_CLAW: 16, // Clawing left (at left boundary)
    R_CLAW: 17, // Clawing right (at right boundary)
  };

  // Behavior modes (matching original Action enum)
  const BehaviorMode = {
    CHASE_MOUSE: 0,
    RUN_AWAY_FROM_MOUSE: 1,
    RUN_AROUND_RANDOMLY: 2,
    PACE_AROUND_SCREEN: 3,
    RUN_AROUND: 4,
  };

  // Animation timing constants (in frames)
  const STOP_TIME = 4;
  const WASH_TIME = 10;
  const SCRATCH_TIME = 4;
  const YAWN_TIME = 3;
  const AWAKE_TIME = 3;
  const CLAW_TIME = 10;

  // Sprite size
  const SPRITE_SIZE = 96;

  class Neko {
    constructor(options = {}) {
      // Configuration
      this.fps = options.fps || 120; // Target FPS (default 120 for smooth movement)
      // Original used 16 pixels/tick for 640x480 screens (~2.5% of width)
      // Modern screens are ~3x larger, so default to 24 for similar feel
      this.speed = options.speed || 24;
      this.behaviorMode = options.behaviorMode || BehaviorMode.CHASE_MOUSE;
      this.idleThreshold = options.idleThreshold || 6; // Original m_dwIdleSpace = 6

      // State
      this.state = NekoState.STOP;
      this.tickCount = 0; // Increments every frame (like m_uTickCount)
      this.stateCount = 0; // Increments every 2 original ticks (like m_uStateCount)

      // Position (display position for smooth rendering)
      this.x = options.startX || 0;
      this.y = options.startY || 0;
      // Logic position (updated at original 5 FPS tick rate)
      this.logicX = this.x;
      this.logicY = this.y;
      // Previous logic position (for interpolation)
      this.prevLogicX = this.x;
      this.prevLogicY = this.y;
      // Target tracking
      this.targetX = this.x;
      this.targetY = this.y;
      this.oldTargetX = this.x;
      this.oldTargetY = this.y;
      // Movement deltas (preserved like m_nDX, m_nDY in original)
      this.moveDX = 0;
      this.moveDY = 0;

      // Bounds - clientWidth excludes scrollbar, innerHeight is viewport height
      this.boundsWidth = document.documentElement.clientWidth - SPRITE_SIZE;
      this.boundsHeight = window.innerHeight - SPRITE_SIZE;

      // Mouse tracking - null until first mouse event
      // This prevents neko from running somewhere before user moves mouse
      this.mouseX = null;
      this.mouseY = null;
      this.hasMouseMoved = false;

      // DOM element
      this.element = null;
      this.spriteImages = [];
      this.allowBehaviorChange = options.allowBehaviorChange !== false; // Default true

      // Animation lookup table (maps state to sprite indices)
      // Format: [frame1_index, frame2_index]
      // These MUST match the original C++ m_nAnimation table EXACTLY
      // From Neko.cpp lines 40-57:
      this.animationTable = [
        [28, 28], // STOP: m_nAnimation[STOP][0]=28, [1]=28
        [25, 28], // WASH: m_nAnimation[WASH][0]=25, [1]=28
        [26, 27], // SCRATCH: m_nAnimation[SCRATCH][0]=26, [1]=27
        [29, 29], // YAWN: m_nAnimation[YAWN][0]=29, [1]=29
        [30, 31], // SLEEP: m_nAnimation[SLEEP][0]=30, [1]=31
        [0, 0], // AWAKE: m_nAnimation[AWAKE][0]=0, [1]=0
        [1, 2], // U_MOVE: m_nAnimation[U_MOVE][0]=1, [1]=2
        [9, 10], // D_MOVE: m_nAnimation[D_MOVE][0]=9, [1]=10
        [13, 14], // L_MOVE: m_nAnimation[L_MOVE][0]=13, [1]=14
        [5, 6], // R_MOVE: m_nAnimation[R_MOVE][0]=5, [1]=6
        [15, 16], // UL_MOVE: m_nAnimation[UL_MOVE][0]=15, [1]=16
        [3, 4], // UR_MOVE: m_nAnimation[UR_MOVE][0]=3, [1]=4
        [11, 12], // DL_MOVE: m_nAnimation[DL_MOVE][0]=11, [1]=12
        [7, 8], // DR_MOVE: m_nAnimation[DR_MOVE][0]=7, [1]=8
        [17, 18], // U_CLAW: m_nAnimation[U_CLAW][0]=17, [1]=18
        [23, 24], // D_CLAW: m_nAnimation[D_CLAW][0]=23, [1]=24
        [21, 22], // L_CLAW: m_nAnimation[L_CLAW][0]=21, [1]=22
        [19, 20], // R_CLAW: m_nAnimation[R_CLAW][0]=19, [1]=20
      ];

      // Additional state for behaviors
      this.cornerIndex = 0;
      this.ballX = 0;
      this.ballY = 0;
      this.ballVX = 0;
      this.ballVY = 0;

      this.init();
    }

    init() {
      // Create the neko element with defensive styles to prevent global CSS interference
      this.element = document.createElement("div");
      this.element.className = "neko";
      this.element.style.cssText = `
        position: fixed;
        width: 96px;
        height: 96px;
        image-rendering: pixelated;
        pointer-events: ${this.allowBehaviorChange ? "auto" : "none"};
        cursor: ${this.allowBehaviorChange ? "pointer" : "default"};
        z-index: 999999;
        left: ${this.x}px;
        top: ${this.y}px;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        overflow: visible;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
      `;

      // Create image element with defensive styles to prevent global CSS interference
      const img = document.createElement("img");
      img.style.cssText = `
        width: 100%;
        height: 100%;
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
        max-width: none;
        max-height: none;
        display: block;
        box-sizing: border-box;
        user-select: none;
        -webkit-user-select: none;
        -webkit-user-drag: none;
        pointer-events: none;
      `;
      this.element.appendChild(img);

      document.body.appendChild(this.element);

      // Click to cycle through behaviors
      // Use mousedown instead of click - click requires mouseup on same element,
      // which fails if the cat moves between mousedown and mouseup
      if (this.allowBehaviorChange) {
        this.element.addEventListener("mousedown", (e) => {
          e.stopPropagation();
          e.preventDefault(); // Prevent text selection
          // Make cat appear surprised/awake
          this.setState(NekoState.AWAKE);
          this.cycleBehavior();
        });
      }

      // Track mouse position - set flag on first move
      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.hasMouseMoved = true;
      });

      // Update bounds on resize
      window.addEventListener("resize", () => {
        this.boundsWidth = document.documentElement.clientWidth - SPRITE_SIZE;
        this.boundsHeight = window.innerHeight - SPRITE_SIZE;
      });

      // Random starting position within viewport
      this.x = Math.random() * this.boundsWidth;
      this.y = Math.random() * this.boundsHeight;
      this.logicX = this.x;
      this.logicY = this.y;
      this.prevLogicX = this.x;
      this.prevLogicY = this.y;
      // Initialize target to current position (so no initial movement)
      this.targetX = this.x + SPRITE_SIZE / 2;
      this.targetY = this.y + SPRITE_SIZE - 1;
      this.oldTargetX = this.targetX;
      this.oldTargetY = this.targetY;
      this.updatePosition();

      // Animation loop
      this.running = false;
      this.intervalId = null;
    }

    start() {
      if (this.running) return;
      this.running = true;

      // Calculate interval from FPS
      // Higher FPS = smoother movement while maintaining same speed
      const interval = 1000 / this.fps;
      this.intervalId = setInterval(() => {
        this.update();
      }, interval);
    }

    stop() {
      this.running = false;
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }

    setSprites(sprites) {
      this.spriteImages = sprites;
      this.updateSprite();
    }

    updateSprite() {
      if (this.spriteImages.length === 0) return;

      // Get the current animation frame index
      // Uses tickCount which is scaled to match original 5 FPS timing
      let frameIndex;
      if (this.state === NekoState.SLEEP) {
        // Slower animation for sleep (toggles every 4 ticks in original = 800ms)
        frameIndex =
          this.animationTable[this.state][(this.tickCount >> 2) & 0x1];
      } else {
        // Normal animation speed (toggles every tick in original = 200ms)
        frameIndex = this.animationTable[this.state][this.tickCount & 0x1];
      }

      // Update the image
      const img = this.element.querySelector("img");
      if (img && this.spriteImages[frameIndex]) {
        img.src = this.spriteImages[frameIndex];
      }
    }

    updatePosition() {
      this.element.style.left = Math.round(this.x) + "px";
      this.element.style.top = Math.round(this.y) + "px";
    }

    update() {
      // Track time accumulator for original tick timing
      // Original runs at 5 FPS (200ms per tick), we run at this.fps
      // We need to accumulate fractional ticks and process when we hit a full tick
      if (this.tickAccumulator === undefined) this.tickAccumulator = 0;

      const originalFPS = 5;
      this.tickAccumulator += originalFPS / this.fps;

      // Process as many original ticks as have accumulated
      while (this.tickAccumulator >= 1) {
        this.tickAccumulator -= 1;
        // Save previous position before processing tick
        this.prevLogicX = this.logicX;
        this.prevLogicY = this.logicY;
        this.processOriginalTick();
      }

      // Smooth interpolation between logic positions
      // tickAccumulator represents progress (0-1) towards next tick
      const t = this.tickAccumulator;
      this.x = this.prevLogicX + (this.logicX - this.prevLogicX) * t;
      this.y = this.prevLogicY + (this.logicY - this.prevLogicY) * t;

      // Update display position every frame
      this.updatePosition();
    }

    processOriginalTick() {
      // This runs at the original 5 FPS equivalent timing
      // Increment tick counter (like m_uTickCount)
      this.tickCount++;
      if (this.tickCount >= 9999) this.tickCount = 0;

      // Increment state counter every 2 ticks (like original)
      if (this.tickCount % 2 === 0) {
        this.stateCount++;
      }

      // Update behavior based on mode
      switch (this.behaviorMode) {
        case BehaviorMode.CHASE_MOUSE:
          this.chaseMouse();
          break;
        case BehaviorMode.RUN_AWAY_FROM_MOUSE:
          this.runAwayFromMouse();
          break;
        case BehaviorMode.RUN_AROUND_RANDOMLY:
          this.runRandomly();
          break;
        case BehaviorMode.PACE_AROUND_SCREEN:
          this.paceAroundScreen();
          break;
        case BehaviorMode.RUN_AROUND:
          this.runAround();
          break;
      }

      // Update animation frame
      this.updateSprite();
    }

    chaseMouse() {
      // Don't chase until mouse has moved at least once
      if (!this.hasMouseMoved) {
        // Just idle in place - pass target that results in zero movement
        this.runTowards(
          this.logicX + SPRITE_SIZE / 2,
          this.logicY + SPRITE_SIZE - 1
        );
        return;
      }
      this.runTowards(this.mouseX, this.mouseY);
    }

    runAwayFromMouse() {
      // Don't run away until mouse has moved
      if (!this.hasMouseMoved) {
        this.runTowards(
          this.logicX + SPRITE_SIZE / 2,
          this.logicY + SPRITE_SIZE - 1
        );
        return;
      }

      // Original uses m_dwIdleSpace * 16 as the trigger distance
      const dwLimit = this.idleThreshold * 16;
      const xdiff = this.logicX + SPRITE_SIZE / 2 - this.mouseX;
      const ydiff = this.logicY + SPRITE_SIZE / 2 - this.mouseY;

      if (Math.abs(xdiff) < dwLimit && Math.abs(ydiff) < dwLimit) {
        // Mouse cursor is too close - run away
        const dLength = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        let targetX, targetY;
        if (dLength !== 0) {
          targetX = this.logicX + (xdiff / dLength) * dwLimit;
          targetY = this.logicY + (ydiff / dLength) * dwLimit;
        } else {
          targetX = targetY = 96;
        }
        this.runTowards(targetX, targetY);
        // Skip awake animation like original
        if (this.state === NekoState.AWAKE) {
          this.calcDirection(targetX - this.logicX, targetY - this.logicY);
        }
      } else {
        // Keep running to current target (idle in place)
        this.runTowards(this.targetX, this.targetY);
      }
    }

    runRandomly() {
      // Original: increments actionCount while sleeping, picks new target after idleSpace*10
      if (this.state === NekoState.SLEEP) {
        this.actionCount = (this.actionCount || 0) + 1;
      }
      if ((this.actionCount || 0) > this.idleThreshold * 10) {
        this.actionCount = 0;
        this.targetX = Math.random() * this.boundsWidth;
        this.targetY = Math.random() * this.boundsHeight;
        this.runTowards(this.targetX, this.targetY);
      } else {
        this.runTowards(this.targetX, this.targetY);
      }
    }

    paceAroundScreen() {
      // Original checks if neko has stopped moving (m_nDX == 0 && m_nDY == 0)
      // We track this via lastMoveDX/DY
      if (this.lastMoveDX === 0 && this.lastMoveDY === 0) {
        this.cornerIndex = ((this.cornerIndex || 0) + 1) % 4;
      }

      // Corners offset by sprite size (matching original)
      // Target positions that result in neko stopping at the corners
      const corners = [
        [SPRITE_SIZE + SPRITE_SIZE / 2, SPRITE_SIZE + SPRITE_SIZE - 1],
        [
          SPRITE_SIZE + SPRITE_SIZE / 2,
          this.boundsHeight - SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
        [
          this.boundsWidth - SPRITE_SIZE + SPRITE_SIZE / 2,
          this.boundsHeight - SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
        [
          this.boundsWidth - SPRITE_SIZE + SPRITE_SIZE / 2,
          SPRITE_SIZE + SPRITE_SIZE - 1,
        ],
      ];

      const target = corners[this.cornerIndex || 0];
      this.runTowards(target[0], target[1]);
    }

    runAround() {
      // Original ball physics with repelling from edges
      const dwBoundingBox = this.speed * 8;

      // Initialize ball if needed (matching original constructor)
      if (this.ballX === 0 && this.ballY === 0) {
        this.ballX = Math.random() * (this.boundsWidth - dwBoundingBox);
        this.ballY = Math.random() * (this.boundsHeight - dwBoundingBox);
        this.ballVX = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
        this.ballVY = (Math.random() < 0.5 ? 1 : -1) * (this.speed / 2) + 1;
      }

      // Move invisible ball
      this.ballX += this.ballVX;
      this.ballY += this.ballVY;

      // Repel from edges (original logic)
      if (this.ballX < dwBoundingBox) {
        if (this.ballX > 0) this.ballVX++;
        else this.ballVX = -this.ballVX;
      } else if (this.ballX > this.boundsWidth - dwBoundingBox) {
        if (this.ballX < this.boundsWidth) this.ballVX--;
        else this.ballVX = -this.ballVX;
      }

      if (this.ballY < dwBoundingBox) {
        if (this.ballY > 0) this.ballVY++;
        else this.ballVY = -this.ballVY;
      } else if (this.ballY > this.boundsHeight - dwBoundingBox) {
        if (this.ballY < this.boundsHeight) this.ballVY--;
        else this.ballVY = -this.ballVY;
      }

      this.runTowards(this.ballX, this.ballY);
    }

    setState(newState) {
      // Reset counters on state change (like original SetState)
      this.tickCount = 0;
      this.stateCount = 0;
      this.state = newState;
    }

    runTowards(targetX, targetY) {
      // Store old target for MoveStart check
      this.oldTargetX = this.targetX;
      this.oldTargetY = this.targetY;
      this.targetX = targetX;
      this.targetY = targetY;

      // Calculate distance to target (using logic position, not display position)
      const dx = targetX - this.logicX - SPRITE_SIZE / 2; // Stop in middle of cursor
      const dy = targetY - this.logicY - SPRITE_SIZE + 1; // Just above cursor
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate movement delta (like original m_nDX, m_nDY)
      // Store as instance variables so they persist across ticks
      // IMPORTANT: Use integers like original to prevent direction flickering
      // which causes state resets and prevents wall clawing
      if (distance !== 0) {
        if (distance <= this.speed) {
          // Less than top speed - jump the gap
          this.moveDX = Math.trunc(dx);
          this.moveDY = Math.trunc(dy);
        } else {
          // More than top speed - run at top speed
          this.moveDX = Math.trunc((this.speed * dx) / distance);
          this.moveDY = Math.trunc((this.speed * dy) / distance);
        }
      } else {
        this.moveDX = 0;
        this.moveDY = 0;
      }

      // Store for paceAroundScreen check
      this.lastMoveDX = this.moveDX;
      this.lastMoveDY = this.moveDY;

      // Check if target moved (MoveStart equivalent)
      const moveStart = !(
        this.oldTargetX >= this.targetX - this.idleThreshold &&
        this.oldTargetX <= this.targetX + this.idleThreshold &&
        this.oldTargetY >= this.targetY - this.idleThreshold &&
        this.oldTargetY <= this.targetY + this.idleThreshold
      );

      // State machine (matching original RunTowards switch)
      switch (this.state) {
        case NekoState.STOP:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= STOP_TIME) {
            // Check for wall scratching using preserved moveDX/moveDY
            if (this.moveDX < 0 && this.logicX <= 0) {
              this.setState(NekoState.L_CLAW);
            } else if (this.moveDX > 0 && this.logicX >= this.boundsWidth) {
              this.setState(NekoState.R_CLAW);
            } else if (this.moveDY < 0 && this.logicY <= 0) {
              this.setState(NekoState.U_CLAW);
            } else if (this.moveDY > 0 && this.logicY >= this.boundsHeight) {
              this.setState(NekoState.D_CLAW);
            } else {
              this.setState(NekoState.WASH);
            }
          }
          break;

        case NekoState.WASH:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= WASH_TIME) {
            this.setState(NekoState.SCRATCH);
          }
          break;

        case NekoState.SCRATCH:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= SCRATCH_TIME) {
            this.setState(NekoState.YAWN);
          }
          break;

        case NekoState.YAWN:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= YAWN_TIME) {
            this.setState(NekoState.SLEEP);
          }
          break;

        case NekoState.SLEEP:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          }
          break;

        case NekoState.AWAKE:
          if (this.stateCount >= AWAKE_TIME + Math.floor(Math.random() * 20)) {
            this.calcDirection(this.moveDX, this.moveDY);
          }
          break;

        case NekoState.U_MOVE:
        case NekoState.D_MOVE:
        case NekoState.L_MOVE:
        case NekoState.R_MOVE:
        case NekoState.UL_MOVE:
        case NekoState.UR_MOVE:
        case NekoState.DL_MOVE:
        case NekoState.DR_MOVE:
          // Calculate new position using preserved moveDX/moveDY
          let newX = this.logicX + this.moveDX;
          let newY = this.logicY + this.moveDY;
          const wasOutside =
            newX <= 0 ||
            newX >= this.boundsWidth ||
            newY <= 0 ||
            newY >= this.boundsHeight;

          // Update direction
          this.calcDirection(this.moveDX, this.moveDY);

          // Clamp position
          newX = Math.max(0, Math.min(this.boundsWidth, newX));
          newY = Math.max(0, Math.min(this.boundsHeight, newY));
          const notMoved = newX === this.logicX && newY === this.logicY;

          // Stop if we can't go further
          if (wasOutside && notMoved) {
            this.setState(NekoState.STOP);
          } else {
            this.logicX = newX;
            this.logicY = newY;
          }
          break;

        case NekoState.U_CLAW:
        case NekoState.D_CLAW:
        case NekoState.L_CLAW:
        case NekoState.R_CLAW:
          if (moveStart) {
            this.setState(NekoState.AWAKE);
          } else if (this.stateCount >= CLAW_TIME) {
            this.setState(NekoState.SCRATCH);
          }
          break;

        default:
          this.setState(NekoState.STOP);
          break;
      }
    }

    calcDirection(dx, dy) {
      // Calculate direction based on movement delta (like original CalcDirection)
      let newState;

      if (dx === 0 && dy === 0) {
        newState = NekoState.STOP;
      } else {
        const largeX = dx;
        const largeY = -dy; // Y is inverted
        const length = Math.sqrt(largeX * largeX + largeY * largeY);
        const sinTheta = largeY / length;

        const sinPiPer8 = 0.3826834323651;
        const sinPiPer8Times3 = 0.9238795325113;

        if (dx > 0) {
          if (sinTheta > sinPiPer8Times3) {
            newState = NekoState.U_MOVE;
          } else if (sinTheta > sinPiPer8) {
            newState = NekoState.UR_MOVE;
          } else if (sinTheta > -sinPiPer8) {
            newState = NekoState.R_MOVE;
          } else if (sinTheta > -sinPiPer8Times3) {
            newState = NekoState.DR_MOVE;
          } else {
            newState = NekoState.D_MOVE;
          }
        } else {
          if (sinTheta > sinPiPer8Times3) {
            newState = NekoState.U_MOVE;
          } else if (sinTheta > sinPiPer8) {
            newState = NekoState.UL_MOVE;
          } else if (sinTheta > -sinPiPer8) {
            newState = NekoState.L_MOVE;
          } else if (sinTheta > -sinPiPer8Times3) {
            newState = NekoState.DL_MOVE;
          } else {
            newState = NekoState.D_MOVE;
          }
        }
      }

      if (this.state !== newState) {
        this.setState(newState);
      }
    }

    isIdle() {
      return (
        this.state === NekoState.STOP ||
        this.state === NekoState.WASH ||
        this.state === NekoState.SCRATCH ||
        this.state === NekoState.YAWN ||
        this.state === NekoState.SLEEP ||
        this.state === NekoState.AWAKE
      );
    }

    cycleBehavior() {
      // Cycle through behaviors: Chase -> Run Away -> Random -> Pace -> Run Around -> back to Chase
      const behaviors = [
        BehaviorMode.CHASE_MOUSE,
        BehaviorMode.RUN_AWAY_FROM_MOUSE,
        BehaviorMode.RUN_AROUND_RANDOMLY,
        BehaviorMode.PACE_AROUND_SCREEN,
        BehaviorMode.RUN_AROUND,
      ];
      const currentIndex = behaviors.indexOf(this.behaviorMode);
      const nextIndex = (currentIndex + 1) % behaviors.length;
      this.behaviorMode = behaviors[nextIndex];

      // Reset state to wake the cat up if sleeping
      if (this.state === NekoState.SLEEP) {
        this.setState(NekoState.AWAKE);
      }

      // Show behavior name (optional - can be removed if you don't want this)
      const behaviorNames = [
        "Chase Mouse",
        "Run Away From Mouse",
        "Run Around Randomly",
        "Pace Around Screen",
        "Run Around",
      ];
      console.log(`Neko behavior: ${behaviorNames[nextIndex]}`);
    }

    destroy() {
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }

  // Export to global scope
  window.Neko = Neko;
  window.NekoState = NekoState;
  window.BehaviorMode = BehaviorMode;

    // Auto-initialize function
    window.createNeko = function(options) {
        const neko = new Neko(options);
        neko.setSprites(NEKO_SPRITES);
        neko.start();
        return neko;
    };

    // Auto-start if script has data-autostart attribute
    if (document.currentScript && document.currentScript.hasAttribute("data-autostart")) {
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", function() {
                window.neko = createNeko();
            });
        } else {
            window.neko = createNeko();
        }
    }
})();
