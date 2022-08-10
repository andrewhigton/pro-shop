import React from 'react'
import { Alert } from 'react-bootstrap'


interface MessageTypes {
	variant: string,
	children?: React.ReactNode,
}

const Message: React.FC<MessageTypes> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message