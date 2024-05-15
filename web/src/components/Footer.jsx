import { ExternalLinkIcon } from '@chakra-ui/icons'
import { HStack, Link, Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
        <HStack backgroundColor={'rgba(0,0,0,0.8)'} spacing={4} position={'absolute'} bottom={0} width={'100%'} justify={'center'}>
            <Text color={'white'}>Created with 💛</Text>
            <Text color={'white'}>&copy; 2024</Text>
            <Link href='https://www.paypal.com/donate/?hosted_button_id=KNGC2UNL6PX7G' isExternal style={{color: 'white'}}>
                Podporiť projekt <ExternalLinkIcon mx='2px' />
            </Link>
        </HStack>
    )
}

export default Footer