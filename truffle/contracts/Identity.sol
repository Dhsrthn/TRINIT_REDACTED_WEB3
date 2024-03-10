// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Token.sol";

contract Identity {
    struct UserInfo {
        string name;
        string email;
        string bio;
        string[] talents;
    }

    address public tokenContract;
    Token public tokens;

    uint256 public totalUserCount;
    address[] public userList;

    string[] public allowedTalents = [
        "Graphic Design",
        "Software Development",
        "Web Development",
        "Data Science",
        "Music Composition",
        "Marketing",
        "Content Writing",
        "Video Production",
        "Photography",
        "Sales",
        "Project Management",
        "Dance",
        "Yoga",
        "Teaching",
        "Woodworking",
        "Nutrition",
        "Personal Training",
        "Acting",
        "Fashion Design",
        "Cybersecurity",
        "Animation",
        "Illustration",
        "UI/UX Design",
        "Blockchain Development",
        "Game Development",
        "Copywriting",
        "SEO",
        "Social Media Management",
        "Event Planning",
        "Accounting",
        "Legal Services",
        "Interior Design",
        "Architecture",
        "Gardening",
        "Culinary Arts",
        "Makeup Artistry",
        "Mobile App Development",
        "Robotics",
        "Virtual Reality",
        "Augmented Reality",
        "Cryptocurrency Trading",
        "Forex Trading",
        "Options Trading",
        "Real Estate",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Chemical Engineering",
        "Biomedical Engineering",
        "Environmental Science",
        "Meteorology",
        "Astronomy",
        "Sculpting",
        "Drawing",
        "Calligraphy",
        "Film Editing",
        "Podcasting",
        "Game Design",
        "Health Coaching",
        "Life Coaching",
        "Financial Planning",
        "E-commerce",
        "Cryptocurrency Analysis",
        "Quantum Computing",
        "AI Development",
        "Machine Learning",
        "Quantitative Analysis",
        "Risk Management",
        "Blockchain Consulting"
    ];

    constructor(address _tokenContract) {
        tokenContract = _tokenContract;
        tokens = Token(tokenContract);
    }

    mapping(address => UserInfo) public users;

    function setUser(
        string memory _name,
        string memory _email,
        string memory _bio,
        string[] memory _talents
    ) public {
        UserInfo storage user = users[msg.sender];
        user.name = _name;
        user.email = _email;
        user.bio = _bio;
        user.talents = _talents;
        tokens.initializeUser(msg.sender);
        totalUserCount++;
        userList.push(msg.sender);
    }

    function getAllowedTalents() public view returns (string[] memory) {
        return allowedTalents;
    }

    function getUser(
        address _user
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string[] memory,
            uint256
        )
    {
        UserInfo storage user = users[_user];
        uint256 userTokens = tokens.balanceOf(_user);
        return (user.name, user.email, user.bio, user.talents, userTokens);
    }
}