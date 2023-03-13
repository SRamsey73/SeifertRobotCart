from pycomm3 import CIPDriver
from pycomm3.logix_driver import ReadWriteReturnType
from pycomm3.cip.services import Services
from pycomm3.tag import Tag

from array import array
from bitstring import BitArray

from time import time

# Identifies the prefixes of the various tags to be read
TAG_IDENTIFIERS = [ "R", "J", "UO" ]
# Max register index to be read
MAX_REGISTER_READ = 124
# Max joint index to be read
MAX_JOINT_READ = 6
# Max user output index to be read
MAX_USER_OUTPUT_READ = 20 


class FanucRobotDriver(CIPDriver):
    '''Fanuc Robot Driver to read and write information using CIP based on pycomm3 implementation'''
    def __init__(self, path: str, *args, **kwargs):
        super().__init__(path, *args, **kwargs)

    
    def classify_tags(self, *tags: str) -> dict[str, list[int]]:
        '''Takes in various tag names and classifies them based on their type and groups tag indexes'''
        classified_tags = { id: [] for id in TAG_IDENTIFIERS }
        
        for tag in tags:
            try:
                o_bracket = tag.index('[')
                c_bracket = tag.index(']')
            except ValueError:
                continue

            identifier = tag[0:o_bracket]
            try:
                index = int(tag[o_bracket+1:c_bracket])
            except ValueError:
                continue
                
            if identifier in classified_tags:
                classified_tags[identifier].append(index)
        
        return classified_tags
    
    
    def read_registers(self, *indexes: int):
        '''Reads the requested register indexes'''
        # Send message to request read of all registers
        r = self.generic_message(service=b'\x01', class_code=b'\x6B', instance=1)
        r = array('i', r.value)
        # Construct dictionary of register index and corresponding value
        return {i: r[i - 1] for i in indexes if i < MAX_REGISTER_READ and i > 0}
            

    def read_joints(self, *indexes: int):
        '''Reads the requested joint indexes'''
        # Send message to request read of all joints
        r = self.generic_message(service=b'\x0E', class_code=b'\x7E', attribute=b'\x01', instance=1)
        r = array('f', r.value[4:])
        # Construct dictionary of joint index and corresponding value
        return {i: r[i - 1] for i in indexes if i <= MAX_JOINT_READ and i > 0}


    def read_user_outputs(self, *indexes: int):
        '''Reads the requested user output indexes'''
        r = self.generic_message(service=b'\x0E', class_code=b'\x04', attribute=b'\x03', instance=0x334) 
        r = [bool(int(n)) for n in BitArray(r.value).bin[5:]]
        return {i: r[i - 1] for i in indexes if i <= MAX_USER_OUTPUT_READ and i > 0}


    def read(self, *tags: str) -> ReadWriteReturnType:
        results = []
        classified_tags = self.classify_tags(*tags)
        register_values = self.read_registers(*classified_tags['R'])
        joint_values = self.read_joints(*classified_tags['J'])
        user_output_values = self.read_user_outputs(*classified_tags['UO'])

        # Create tag objects for registers
        for index, val in register_values.items():
            results.append(Tag(f'R[{index}]', val, "INT"))
        
        # Create tag objects for joints
        for index, val in joint_values.items():
            results.append(Tag(f'J[{index}]', val, "FLOAT"))

        # Create tag objects for user outpts
        for index, val in user_output_values.items():
            results.append(Tag(f'UO[{index}]', val, "BOOL"))

        return results


import socket

if __name__ == "__main__":
    # with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    #     s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #     s.connect(('192.168.2.40', 44818))
    #     s.send(b'test')
    #     print(s.getpeername())
     
    with FanucRobotDriver('192.168.2.40') as fanuc:
        #print(fanuc.get_module_info(slot=0))
        r = fanuc.generic_message(service=b'\x01', class_code=b'\x6B', instance=1)
        # r = fanuc.read_registers(2)
        print(r)

