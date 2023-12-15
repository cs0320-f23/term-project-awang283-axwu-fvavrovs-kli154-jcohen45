package edu.brown.cs.student.main.types;

public enum Recurrence {
    NEVER, DAILY, WEEKLY, MONTHLY;

    private String name;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
