import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Flex,
  Text,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
import Link from 'next/link'
import { SearchIcon, AddIcon} from '@chakra-ui/icons'
import useInput from '../hooks/useInput'

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [data, setData] = useState([
    {
      name: 'Weibo',
      path: 'https://www.weibo.com',
      favicon: 'https://www.weibo.com/favicon.ico'
    },
    {
      name: 'Baidu',
      path: 'https://www.baidu.com',
      favicon: 'https://www.baidu.com/favicon.ico'
    }
  ])
  const nameInfo = useInput("")
  const pathInfo = useInput("")
  const reSet = () => {
    nameInfo.setValue('')
    pathInfo.setValue('')
  }
  const handleSubmit = () => {
    const { value: name } = nameInfo.input
    let { value: path } = pathInfo.input
    if (!path.startsWith('http')) {
      path = `https://${path}`
      
    }
    const favicon = `${path}/favicon.ico`
    setData([...data, {
      name,
      path,
      favicon
    }])
    reSet()
    onClose()
  }
  const handleClose = () => {
    reSet()
    onClose()
  }
  return (
    <ChakraProvider theme={theme}>
      <Box className={styles.container}>
        <Head>
          <title>"新标签页"</title>
        </Head>
        <InputGroup w="561px" h="44px">
        <InputLeftElement pointerEvents="none" children={<SearchIcon/>} />
        <Input />
        </InputGroup>
        <Flex className={styles.wrapper}>
          {data.map((item, index) => (
            <Link  key={index} href={item.path}>
              <Box className={styles.collection}>
                <Box className={styles.imgWrapper}>
                  <Image src={item.favicon} boxSize="24px" />
                </Box>
                <Text>
                  {item.name}
                </Text>
              </Box>
            </Link>
          ))}
          <Box className={styles.collection} onClick={onOpen}>
            <Box className={styles.imgWrapper}>
              <AddIcon boxSize="24px" />
            </Box>
            <Text>
              添加快捷方式
          </Text>
          </Box>
        </Flex>
      </Box>

      <Modal
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>添加快捷方式</ModalHeader>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>名称</FormLabel>
              <Input {...nameInfo.input} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>网址</FormLabel>
              <Input {...pathInfo.input} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              完成
            </Button>
            <Button onClick={handleClose}>取消</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  )
}