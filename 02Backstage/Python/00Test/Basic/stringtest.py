def test_string():
    s1 = "\nCherry\n"
    s2 = r"\n\\hello"
    print(s1,s2)

    s3 = "ok"
    s4 = "okkjune"
    print(s3 in s4)
    print(s1 in s4)

    print("Test [] or [:]:"+s4[1:4])

if __name__ == "__main__":
    test_string()