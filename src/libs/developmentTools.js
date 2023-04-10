
export function isInDevelopmentMode()
{
    return process.env.NODE_ENV === 'development';
}

export function OnlyVisibleInDevelopment(props)
{
    const style = {
        display: isInDevelopmentMode() ? '' : 'none'
    }
    return (
        <div style={style}>
            {props.children}
        </div>
    )
}