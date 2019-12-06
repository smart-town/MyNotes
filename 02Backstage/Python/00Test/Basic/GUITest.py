"""
Python GUI Test
"""
import tkinter
import tkinter.messagebox

def main():
	flag = True
	
	def confirm_to_quit():
		if tkinter.messagebox.askokcancel("tip", "Sure Quit?"):
			top.quit()

	top = tkinter.Tk()
	top.geometry('240*160')
	top.title("^_^")
	label = tkinter.Label(top, text="Hello,Cherry!", fg="lightblue")
	label.pack(expand=1)
	panel = tkinter.Frame(top)

	tkinter.mainloop()

if __name__ == '__main__':
	main()
