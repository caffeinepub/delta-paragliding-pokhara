import List "mo:core/List";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

actor {
  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    packageType : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  let submissions = List.empty<ContactSubmission>();

  public shared ({ caller }) func submitContact(
    name : Text,
    email : Text,
    phone : Text,
    message : Text,
    packageType : Text,
  ) : async () {
    let newSubmission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      packageType;
      timestamp = Time.now();
    };
    submissions.add(newSubmission);
  };

  public query ({ caller }) func getAllSubmissions() : async [ContactSubmission] {
    submissions.values().toArray().sort(ContactSubmission.compareByTimestamp);
  };
};
