const firstLatterCapital = (name) => {
 const firstLatter = name ? name.charAt(0).toUpperCase() + name.slice(1) : ""
 return firstLatter
}
export default firstLatterCapital