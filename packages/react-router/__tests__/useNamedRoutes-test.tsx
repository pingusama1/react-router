import { MemoryRouter, Route, Routes, useNamedRoutes } from "react-router"
import * as React from "react"
import * as TestRenderer from "react-test-renderer"

function WriteRouteURL({name,args}: { name: string,args?: { [x:string]:string } }): JSX.Element
{
    const {route}=useNamedRoutes()

    return <h1>{route(name,args)}</h1>
}

function generateRouterToWriteRoute(name: string,args?: { [x: string]: string }): JSX.Element
{
    return (
        <MemoryRouter initialEntries={["/test/"]}>
            <Routes>
                <Route path="/login" name="login" />
                <Route path="/hello/:name" name="hello" />
                <Route path="/test" element={<WriteRouteURL name={name} args={args} />} />
                <Route path="/vendor/:vendor/category/:category" name="vendor_category" />
            </Routes>
        </MemoryRouter>
    )
}

describe("Named routes",()=>{
    it("Route without argument",()=>{
        let renderer: TestRenderer.ReactTestInstance
        TestRenderer.act(()=>{
            renderer=TestRenderer.create(generateRouterToWriteRoute("login"))
        })

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
            <h1>
                /login
            </h1>
        `)
    })


    it("Route with 1 argument",()=>{
        let renderer: TestRenderer.ReactTestRenderer
        TestRenderer.act(()=>{
            renderer = TestRenderer.create(generateRouterToWriteRoute("hello",{ name:"John" }))
        })

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
            <h1>
                /hello/John
            </h1>
        `)
    })

    it("Route with 2 arguments",()=>{
        let renderer: TestRenderer.ReactTestRenderer

        TestRenderer.act(()=>{
            renderer = TestRenderer.create(generateRouterToWriteRoute("vendor_category",{ vendor:"5",category:"10" }))
        })

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
            <h1>
                /vendor/5/category/10
            </h1>
        `)
    })
})