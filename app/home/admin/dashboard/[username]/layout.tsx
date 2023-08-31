interface ILayout {
    children: React.ReactNode
    maps: React.ReactNode

}

export default function Layout(props: ILayout) {
    return (
        <>
            {props.children}
        </>
    )
}