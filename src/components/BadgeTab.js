import { Badge } from "react-bootstrap"

const BadgeTab = ({
  title,
  number,
  type
}) => {
  return (
    <>{title} <Badge pill bg={type}>{number}</Badge></>
  )
}

export default BadgeTab;