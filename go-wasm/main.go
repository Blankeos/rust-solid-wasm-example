package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Println("Hello World!")
}

func add(a js.Value, b js.Value) int {
	fmt.Println("Adding.")

	return a + b
}
