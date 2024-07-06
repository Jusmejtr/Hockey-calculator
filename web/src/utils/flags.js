import ReactCountryFlag from "react-country-flag"
import countries from '../components/countries'

export default function countryFlags(team, mobileRes = 768) {
    if (window.innerWidth < mobileRes) {
        return (
            <ReactCountryFlag
                countryCode={countries[team]}
                svg
                style={{ fontSize: '1.5rem' }}
                alt={team}
            />
        )
    } else {
        return (
            <ReactCountryFlag
                countryCode={countries[team]}
                svg
                style={{ fontSize: '2rem' }}
                alt={team}
            />
        )
    }
}

