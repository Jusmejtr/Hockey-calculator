import { ExternalLinkIcon } from '@chakra-ui/icons'
import { HStack, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
        <VStack backgroundColor={'rgba(0,0,0,0.8)'} spacing={1} position={'absolute'} bottom={0} width={'100%'} justify={'center'}>

            <HStack >
                <Text color={'white'}>Created with 💛</Text>
                <Link href='https://www.paypal.com/donate/?hosted_button_id=KNGC2UNL6PX7G' isExternal style={{ color: 'white' }}>
                    Podporiť projekt <ExternalLinkIcon mx='2px' />
                </Link>
            </HStack>
            <HStack>
                <Text color={'white'}>v 1.6</Text>
                <Text color={'white'}>&copy; 2024</Text>
            </HStack>
        </VStack>
    )
}

export default Footer
